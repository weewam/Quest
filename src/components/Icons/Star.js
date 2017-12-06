import React, { Component } from 'react';
import Svg,{
	Circle,
	Ellipse,
	G,
	Line,
	Path,
	Polygon,
	Rect,
} from 'react-native-svg';

const original_height = 50;
const original_width = 50;

export default class Star extends Component {
	constructor(props) {
		super(props)
	 }

	render() {
		let { width, color } = this.props;

		let aspectRatio = original_height/original_width;

		return (
			<Svg width={ width } height={ aspectRatio * width } viewBox="0 0 50 50">
				<G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<G id="Artboard" fillRule="nonzero" fill={ color }>
						<G id="star" transform="translate(0.000000, 1.000000)">
							<Path d="M27.4157682,1.50120065 L33.0555055,12.9287875 C33.44769,13.7235868 34.2059828,14.2743139 35.0831825,14.4015652 L47.6946239,16.234193 C49.9037905,16.5554504 50.7851624,19.2694502 49.1872195,20.8267144 L40.0616301,29.7217911 C39.4274595,30.340316 39.1374934,31.2321184 39.2876917,32.105146 L41.4415769,44.6654783 C41.8191588,46.8652574 39.50986,48.5424717 37.5343352,47.5046432 L26.2548606,41.5749398 C25.4704917,41.1629375 24.5327954,41.1629375 23.7484266,41.5749398 L12.468952,47.5046432 C10.4934272,48.5435148 8.18412842,46.8652574 8.56171024,44.6654783 L10.7155955,32.105146 C10.8657938,31.2321184 10.5758276,30.340316 9.94165707,29.7217911 L0.816067698,20.8267144 C-0.781875257,19.2684071 0.099496673,16.5544074 2.30866324,16.234193 L14.9201047,14.4015652 C15.7973044,14.2743139 16.5555972,13.7235868 16.9477816,12.9287875 L22.5875189,1.50120065 C23.5742383,-0.500400217 26.4280059,-0.500400217 27.4157682,1.50120065 Z" id="Shape"></Path>
						</G>
					</G>
				</G>
			</Svg>
		)
	}
}