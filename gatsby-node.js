/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const { createRemoteFileNode } = require('gatsby-source-filesystem');

const wait = async () => {
	setTimeout(() => {
		console.log('waiting');
	}, 200);
};

exports.onCreateNode = async ({
	node,
	actions: { createNode },
	store,
	cache,
	createNodeId,
}) => {
	if (node.internal.type === 'S3Image') {
		await wait();
		let fileNode = await createRemoteFileNode({
			url: `https://mydailynikon.s3-eu-west-1.amazonaws.com/${node.Key}`, // string that points to the URL of the image
			parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
			createNode, // helper function in gatsby-node to generate the node
			createNodeId, // helper function in gatsby-node to generate the node id
			cache, // Gatsby's cache
			store, // Gatsby's redux store
		});
		// if the file was created, attach the new node to the parent node
		if (fileNode) {
			node.featuredImg___NODE = fileNode.id;
		}
	}
};

exports.createPages = async ({ actions, graphql }) => {
	const { data } = await graphql(`
		query MyQuery {
			allFile(
				filter: { name: { nin: "profile", ne: "favicon" } }
				sort: { order: ASC, fields: birthTime }
			) {
				edges {
					node {
						id
						name
						internal {
							type
							mediaType
						}
						birthTime
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
			 allS3Object {
				nodes {
					LastModified
					Key
				}
			}
		}
	`);
	const photos = data.allFile.edges;
	const photoInfo = data.allS3Object.nodes;
	const totalPages = photos.length;
	const photosWithDetails = photos.map((item) => {
		const [details] = photoInfo.filter((detail) => detail.Key.split('.')[0] === item.node.name);
		const year = item.node.name.split('_')[2] === '2021' ? '2021' : '2020';
		const day = `${item.node.name.split('_')[0]} ${item.node.name.split('_')[1]} ${year}`;
		const merged = {
			...item.node,
			lastModified: details.LastModified,
			day,
			totalPages
		};
		return merged;
	})
	photosWithDetails.sort((a, b) => {
		return new Date(b.lastModified) - new Date(a.lastModified);
	}).forEach((item, index) => {
		console.log({ item })
		actions.createPage({
			path: `photo/${index + 1}`,
			component: require.resolve('./src/templates/photo.js'),
			context: {
				photo: {
					...item,
					pageNumber: index + 1,
				},
			},
		});
	});
};
