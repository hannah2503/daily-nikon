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
		console.log(node)
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
			allS3Image {
				edges {
					node {
						id
						ETag
						Extension
						IsTruncated
						Key
						LastModified
						KeyCount
						MaxKeys
						Name
						Prefix
						StorageClass
						Url
						Size
					}
				}
			}
		}
	`);

	const totalPages = data.allS3Image.edges.length;
	data.allS3Image.edges
		.sort((a, b) => {
			return (
				parseInt(b.node.Key.split('_')[0]) - parseInt(a.node.Key.split('_')[0])
			);
		})
		.forEach((item, index) => {
			const imgUrl = `https://mydailynikon.s3-eu-west-1.amazonaws.com/${item.node.Key}`;
			const day = `${item.node.Key.split('_')[0]} ${
				item.node.Key.split('_')[1]
			} ${new Date().getFullYear()}`;

			actions.createPage({
				path: `day/${index + 1}`,
				component: require.resolve('./src/templates/photo.js'),
				context: {
					photo: {
						...item.node,
						imgUrl,
						day,
						totalPages,
						pageNumber: index + 1,
					},
				},
			});
		});
};