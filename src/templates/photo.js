import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/main.scss';

export default ({ pageContext: { photo } }) => {
	const { pageNumber, totalPages, LastModified, Key } = photo;
	return (
		<Layout sticky={true}>
			<SEO title={`Photo ${Key}`} />
			<a className="heading-link" href="/">
				<h1>Daily Nikon</h1>
			</a>
			<div className="shape circle"></div>
			<div className="shape circle-sm">
				<div className="shape circle-layer"></div>
			</div>
			<div className="container">
				<div className="image-container">
					<img
						src={`https://mydailynikon.s3-eu-west-1.amazonaws.com/${Key}`}
						alt="daily nikon"
					/>
				</div>
				<div className="sub-text">
					<div>
						<small>
							© Daily Nikon - Hannah Cross {LastModified.split('T')[0]}
						</small>
					</div>
					<div className="page-links-container">
						{pageNumber === 1 && pageNumber < totalPages && (
							<a className="page-links" href={`/day/${pageNumber + 1}`}>
								Next
							</a>
						)}
						{pageNumber > 1 && pageNumber < totalPages && (
							<div>
								<a className="page-links" href={`/day/${pageNumber - 1}`}>
									Back
								</a>
								<a className="page-links" href={`/day/${pageNumber + 1}`}>
									Next
								</a>
							</div>
						)}
						{pageNumber === totalPages && (
							<div>
								<a className="page-links" href={`/day/${pageNumber - 1}`}>
									Back
								</a>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
};
