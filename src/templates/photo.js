import React from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import '../scss/main.scss';

export default ({ pageContext: { photo } }) => {
	const { pageNumber, totalPages, Key } = photo;
	const day = `${Key.split('_')[0]} ${
		Key.split('_')[1]
	} ${new Date().getFullYear()}`;
	return (
		<Layout sticky={true}>
			<SEO title={`Photo ${day}`} />
			<a className="heading-link" href="/">
				<span> ◁ </span>
			</a>
			<div className="header">
				<h2>{day}</h2>
			</div>
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
						<small>© Daily Nikon - {day}</small>
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
						{pageNumber > 1 && pageNumber === totalPages && (
							<div>
								<a className="page-links" href={`/day/${pageNumber - 1}`}>
									Back
								</a>
							</div>
						)}
						{totalPages <= 1 && (
							<div>
								<a className="page-links" href={`/`}>
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
