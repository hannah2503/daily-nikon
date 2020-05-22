import React, { Suspense } from 'react';
import { Img } from 'react-image';
import Layout from '../components/layout';
import SEO from '../components/seo';
import Navigation from '../components/navigation';
import '../scss/main.scss';

export default ({ pageContext: { photo } }) => {
	const { Key, pageNumber, totalPages } = photo;

	const day = `${Key.split('_')[0]} ${
		Key.split('_')[1]
	} ${new Date().getFullYear()}`;

	return (
		<Suspense>
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
						<Img
							src={`https://mydailynikon.s3-eu-west-1.amazonaws.com/${Key}`}
							key={Key}
							alt={Key}
						/>
					</div>

					<div className="sub-text">
						<div>
							<small>© Daily Nikon - {day}</small>
						</div>
						<Navigation pageNumber={pageNumber} totalPages={totalPages} />
					</div>
				</div>
			</Layout>
		</Suspense>
	);
};
