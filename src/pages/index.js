import React from 'react';
import { Img } from 'react-image';

import { graphql } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../scss/main.scss';

const IndexPage = ({ data }) => {
	const photos = data.allFile.edges.slice(1);
	const images = photos.sort((a, b) => {
		const yearA = a.node.name.split('_')[2] === '2021' ? '2021' : '2020';
		const yearB  = b.node.name.split('_')[2] === '2021' ? '2021' : '2020';
		
		return (
			new Date(
				b.node.name.split('_')[0] +
					b.node.name.split('_')[1] +
					yearB
			) -
			new Date(
				a.node.name.split('_')[0] +
					a.node.name.split('_')[1] +
					yearA
			)
		);
	});

	const imageList = images.sort((a,b) => {
		const monthA = a.node.name.split('_')[1];
		const monthB= b.node.name.split('_')[1];
		return monthA === monthB && b.node.name.split('_')[2] - a.node.name.split('_')[2]
	})

	const finalImageList = imageList.sort((a,b)=> {
		const monthA = a.node.name.split('_')[1];
		const monthB= b.node.name.split('_')[1];
		return monthA === monthB && b.node.name.split('_')[0] - a.node.name.split('_')[0]
	})

	return (
		<Layout>
			<SEO title="Home" />
				<div className="thumbnails">
					{finalImageList.map((item, i) => {
						const arr = item.node.name.split('_');
						arr.splice(2, 0, '#');
						const title = arr.join(' ');

						return (
							<>
								<VisibilitySensor>
									<div key={i} className="thumbnail">
										<a key={i + 1} href={`/photo/${i + 1}`}>
											<Img
												src={`${item.node.childImageSharp.fixed.src}`}
												key={item.node.name}
												alt={item.node.name}
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
		allFile(filter: { internal: { mediaType: { nin: "image/png" } } }) {
			edges {
				node {
					id
					internal {
						type
						mediaType
					}
					birthTime
					extension
					childImageSharp {
						fixed(height: 400) {
							base64
							tracedSVG
							aspectRatio
							srcWebp
							srcSetWebp
							originalName
							src
						}
					}
					name
				}
			}
		}
	}
`;
export default IndexPage;
