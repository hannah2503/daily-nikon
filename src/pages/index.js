import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/main.scss';

const IndexPage = ({ data }) => {
	const images = data.allS3Image.edges;
	return (
		<Layout sticky={false}>
			<SEO title="Home" />
			<h1 className="heading-xl">Daily Nikon</h1>
			<div className="shape square">
				<div className="shape square-layer-1"></div>
				<div className="shape square-layer-2"></div>
			</div>
			<div className="shape square-sm">
				<div className="shape square-layer-1"></div>
			</div>
			<div className="thumbnails">
				{images.map((item, i) => (
					<div key={i} className="thumbnail">
						<a key={i} href={`/day/${i + 1}`}>
							<img
								key={i}
								src={`https://mydailynikon.s3-eu-west-1.amazonaws.com/${item.node.Key}`}
								alt={`${item.node.Key}`}
							/>
						</a>
					</div>
				))}
			</div>
			<h2 className="heading-l"> by Hannah Cross</h2>
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
