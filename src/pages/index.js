import React from 'react';
import { Img } from 'react-image';

import { graphql } from 'gatsby';
import VisibilitySensor from 'react-visibility-sensor';

import Layout from '../components/layout';
import SEO from '../components/seo';

import '../scss/main.scss';
import profile from '../images/profile.jpg';

const IndexPage = ({ data }) => {
	const images = data.allS3Image.edges.sort((a, b) => {
		return (
			new Date(
				b.node.Key.split('_')[0] +
					b.node.Key.split('_')[1] +
					new Date().getFullYear()
			) -
			new Date(
				a.node.Key.split('_')[0] +
					a.node.Key.split('_')[1] +
					new Date().getFullYear()
			)
		);
	});

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
						const arr = item.node.Key.split('.')[0].split('_');
						arr.splice(2, 0, '#');
						const title = arr.join(' ');

						return (
							<>
								<VisibilitySensor>
									<div key={i} className="thumbnail">
										<a href={`/day/${i + 1}`}>
											<Img
												src={`https://mydailynikon.s3-eu-west-1.amazonaws.com/${item.node.Key}`}
												key={item.node.Key}
												alt={item.node.Key}
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
	query {
		allS3Image {
			edges {
				node {
					id
					Url
					Key
					Extension
					Name
					LastModified
				}
			}
		}
	}
`;
export default IndexPage;
