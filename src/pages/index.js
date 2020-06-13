import React from 'react';
import { Img } from 'react-image';

import { graphql } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../scss/main.scss';
import profile from '../images/profile.jpg';

const IndexPage = ({ data }) => {
	const photos = data.allFile.edges.slice(2)

	const images = photos.sort((a, b) => {
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
	});
	console.log('images', images)
	return (
		<Layout>
			<SEO title="Home" />
			<div className="flex-container">
				<header>
					<h1 className="heading-xl"> Daily Nikon </h1>
					<h2 className="heading-l">Hannah Cross</h2>
					<p>Photography & Web Development</p>
					<div className="heading-image-container">
						<Img src={profile} alt="self-portrait with camera" />
					</div>
				</header>
				<div className="thumbnails">
					{images.map((item, i) => {
						const arr = item.node.name.split('_');
						arr.splice(2, 0, '#');
						const title = arr.join(' ');

						return (
							<>
								<VisibilitySensor>
									<div key={i} className="thumbnail">
										<a href={`/day/${i + 1}`}>
											<Img
												src={`${item.node.childImageSharp.fixed.src}`}
												key={item.node.name}
												alt={item.node.name}
												decode={true}
												loading="lazy"
											/>
										</a>
										<h3>{title}</h3>
									</div>
								</VisibilitySensor>
							</>
						);
					})}
				</div>
			</div>
		</Layout>
	);
};

export const query = graphql`
	query MyQuery {
		allFile {
			edges {
				node {
					id
					internal {
						type
						mediaType
					}
					extension

					childImageSharp {
						fixed(grayscale: true, height: 400) {
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
