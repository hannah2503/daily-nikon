import { graphql } from 'gatsby';
import React from 'react';
import { Img } from 'react-image';
import VisibilitySensor from 'react-visibility-sensor';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/main.scss';




const IndexPage = ({ data }) => {
	const photos = data.allFile.edges;
	const photoInfo = data.allS3Object.nodes;
	const totalPages = photos.length;
	const photosWithDetails = photos.map((item) => {
		const [details] = photoInfo.filter((detail) => detail.Key.split('.')[0] === item.node.name);
		const year = item.node.name.split('_')[2] === '2021' ? '2021' : '2020';
		const day = `${item.node.name.split('_')[0]} ${item.node.name.split('_')[1]} ${year}`;
		return {
			...item.node,
			lastModified: details.LastModified,
			day,
			totalPages
		};
	});

	photosWithDetails.sort((a, b) => {
		return new Date(b.lastModified) - new Date(a.lastModified);
	});

	return (
		<Layout>
			<SEO title="Home" />
			<div className="thumbnails">
				{photosWithDetails.map((item, i) => {
					const arr = item.name.split('_');
					arr.splice(2, 0, '#');
					const title = arr.join(' ');

					return (
						<>
							<VisibilitySensor>
								<div key={i} className="thumbnail">
									<a key={i + 1} href={`/photo/${i + 1}`}>
										<Img
											src={`${item.childImageSharp.fixed.src}`}
											key={item.name}
											alt={item.name}
											decode={true}
										/>
									</a>
									<h3 key={title}>{title}</h3>
								</div>
							</VisibilitySensor>
						</>
					);
				})}
			</div>
		</Layout>
	);
};

export const query = graphql`
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
`;
export default IndexPage;
