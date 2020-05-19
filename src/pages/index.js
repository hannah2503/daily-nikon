import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/main.scss';

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
		<Layout sticky={false}>
			<SEO title="Home" />
			<h1 className="heading-xl"> Daily Nikon </h1>{' '}
			<h2 className="heading-l">
				{' '}
				Viennese, frappuccino irish espresso pumpkin spice aromatic instant.{' '}
			</h2>
			<div className="shape square">
				<div className="shape square-layer-1"> </div>{' '}
			</div>{' '}
			<div className="shape square-sm">
				<div className="shape square-layer-2"> </div>{' '}
			</div>{' '}
			<div className="thumbnails">
				{' '}
				{images.map((item, i) => {
					const arr = item.node.Key.split('.')[0].split('_');
					arr.splice(2, 0, '#');
					const title = arr.join(' ');
					return (
						<>
							<div key={i} className="thumbnail">
								<a key={i} href={`/day/${i + 1}`}>
									<img
										key={i}
										src={`https://mydailynikon.s3-eu-west-1.amazonaws.com/${item.node.Key}`}
										alt={`${item.node.Key}`}
										loading="lazy"
									/>
								</a>
								<h3 key={i + 1}>{title}</h3>
							</div>
						</>
					);
				})}{' '}
			</div>{' '}
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
