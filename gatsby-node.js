/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const {
	createRemoteFileNode
} = require("gatsby-source-filesystem")

const wait = async () => {
	setTimeout(() => {
		console.log('waiting')
	}, 200)
}

exports.onCreateNode = async ({
	node,
	actions: {
		createNode
	},
	store,
	cache,
	createNodeId,
}) => {
	if (node.internal.type === "S3Image") {
		await wait()
		let fileNode = await createRemoteFileNode({
			url: `https://mydailynikon.s3-eu-west-1.amazonaws.com/${node.Key}`, // string that points to the URL of the image
			parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
			createNode, // helper function in gatsby-node to generate the node
			createNodeId, // helper function in gatsby-node to generate the node id
			cache, // Gatsby's cache
			store, // Gatsby's redux store
		})
		// if the file was created, attach the new node to the parent node
		if (fileNode) {
			node.featuredImg___NODE = fileNode.id
		}
	}
}

exports.createPages = async ({
	actions,
	graphql
}) => {
	const {
		data
	} = await graphql(`
		query MyQuery {
			allFile(filter: {
					internal: {
						mediaType: {
							nin: "image/png"
						}
					}
				}) {
					edges {
						node {
							id
							name
							internal {
								type
								mediaType
							}
							extension
							childImageSharp {
								fixed(grayscale: false, height: 600) {
									base64
									tracedSVG
									aspectRatio
									srcWebp
									srcSetWebp
									originalName
									src
								}
							}
							
						}
				}
			}
		}
	`);

	const photos = data.allFile.edges.slice(1)
	const totalPages = photos.length;
	photos.sort((a, b) => {
		return (
			new Date(
				b.node.name.split('_')[0] +
				b.node.name.split('_')[1] +
				new Date().getFullYear()
			) -
			new Date(
				a.node.name.split('_')[0] +
				a.node.name.split('_')[1] +
				new Date().getFullYear()
			)
		);
	}).forEach((item, index) => {
		const year = item.node.name.split('_')[2] === '2021' ? '2021' : '2020';
		const day = `${item.node.name.split('_')[0]} ${
				item.node.name.split('_')[1]
			} ${year}`;

		actions.createPage({
			path: `photo/${index + 1}`,
			component: require.resolve('./src/templates/photo.js'),
			context: {
				photo: {
					...item.node,
					day,
					totalPages,
					pageNumber: index + 1,
				},
			},
		});
	});
};