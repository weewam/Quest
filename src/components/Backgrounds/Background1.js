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

const original_height = 524;
const original_width = 816;

export default class Background extends Component {
	constructor(props) {
			super(props)
	 }

	render() {
		let { width } = this.props;

		let aspectRatio = original_height/original_width;

		return (
			<Svg width={ width } height={ aspectRatio * width } viewBox="0 0 816 524">
				<G id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
					<G id="Trials-11" fillRule="nonzero">
						<Polygon id="Shape" fill="#E5BB88" points="153.76 18.9 153.76 65.57 153.76 112.24 179.26 112.24 179.26 65.57 179.26 18.9"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="384.5 18.9 384.5 65.57 384.5 112.24 410 112.24 410 65.57 410 18.9"></Polygon>
						<Polygon id="Shape" fill="#E8CC87" points="107.03 31.4 199.03 177.4 199.03 523.4 107.03 523.4"></Polygon>
						<Polygon id="Shape" fill="#EAE086" points="107.03 31.4 15.03 177.4 15.03 523.4 107.03 523.4"></Polygon>
						<Polygon id="Shape" fill="#E8CC87" points="337.76 31.4 429.76 177.4 429.76 523.4 337.76 523.4"></Polygon>
						<Polygon id="Shape" fill="#EAE086" points="337.76 31.4 245.76 177.4 245.76 523.4 337.76 523.4"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="222.52 204.4 199.03 204.4 199.03 236.74 222.52 236.74 246.01 236.74 246.01 204.4"></Polygon>
						<Polygon id="Shape" fill="#E8CC87" points="15.03 177.4 0.03 162.4 107.03 0.4 107.03 31.4"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="199.03 177.4 214.03 162.4 107.03 0.4 107.03 31.4"></Polygon>
						<Polygon id="Shape" fill="#E8CC87" points="245.76 177.4 230.76 162.4 337.76 0.4 337.76 31.4"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="429.76 177.4 444.76 162.4 337.76 0.4 337.76 31.4"></Polygon>
						<Polygon id="Shape" fill="#E2A688" points="429.76 208.4 429.76 177.4 337.76 31.4 337.76 62.4"></Polygon>
						<Polygon id="Shape" fill="#E2A688" points="199.03 208.4 199.03 177.4 107.03 31.4 107.03 62.4"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="15.03 208.4 15.03 177.4 107.03 31.4 107.03 62.4"></Polygon>
						<Polygon id="Shape" fill="#E5BB88" points="245.76 208.4 245.76 177.4 337.76 31.4 337.76 62.4"></Polygon>
						<Circle id="Oval" fill="#E8CC87" cx="107.9" cy="115.28" r="17.38"></Circle>
						<Circle id="Oval" fill="#EAE086" cx="107.9" cy="115.28" r="10.13"></Circle>
						<Circle id="Oval" fill="#E8CC87" cx="337.76" cy="115.28" r="17.38"></Circle>
						<Path d="M107,412.07 L107,412.07 C128.721359,412.07 146.33,429.678641 146.33,451.4 L146.33,503.4 L67.7,503.4 L67.7,451.4 C67.6999937,429.690351 85.2903574,412.08656 107,412.07 L107,412.07 Z" id="Shape" fill="#E5BB88"></Path>
						<Path d="M107,429.4 L107,429.4 C113.471282,429.4 119.677518,431.970707 124.253405,436.546595 C128.829293,441.122482 131.4,447.328718 131.4,453.8 L131.4,503.4 L82.62,503.4 L82.62,453.8 C82.6199955,440.332059 93.5320633,429.411039 107,429.4 Z" id="Shape" fill="#E2A688"></Path>
						<Rect id="Rectangle-Path" fill="#E2A688" x="107.03" y="503.4" width="39.33" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="67.7" y="503.4" width="39.33" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="58.86" y="513.4" width="48.17" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="107.03" y="513.4" width="48.17" height="10"></Rect>
						<Path d="M337.76,412.07 L337.76,412.07 C348.192697,412.067347 358.199006,416.209861 365.576974,423.585954 C372.954943,430.962047 377.1,440.967303 377.1,451.4 L377.1,503.4 L298.43,503.4 L298.43,451.4 C298.43,429.678641 316.038641,412.07 337.76,412.07 L337.76,412.07 Z" id="Shape" fill="#E5BB88"></Path>
						<Path d="M337.76,429.4 L337.76,429.4 C351.235748,429.4 362.16,440.324252 362.16,453.8 L362.16,503.4 L313.36,503.4 L313.36,453.8 C313.36,440.324252 324.284252,429.4 337.76,429.4 Z" id="Shape" fill="#E2A688"></Path>
						<Rect id="Rectangle-Path" fill="#E2A688" x="337.76" y="503.4" width="39.33" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="298.43" y="503.4" width="39.33" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="289.6" y="513.4" width="48.17" height="10"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="337.76" y="513.4" width="48.17" height="10"></Rect>
						<Circle id="Oval" fill="#EAE086" cx="337.76" cy="115.28" r="10.13"></Circle>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="34.79" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="94.28" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="153.76" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="34.79" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="94.28" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="153.76" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="34.79" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="94.28" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="153.76" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="265.53" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="325.01" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="384.5" y="190.07" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="265.53" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="325.01" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="384.5" y="257.69" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="265.53" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="325.01" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E5BB88" x="384.5" y="325.32" width="25.5" height="46.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="199.03" y="236.74" width="46.74" height="15"></Rect>
						<Rect id="Rectangle-Path" fill="#E8CC87" x="222.52" y="251.74" width="23.25" height="271.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="523.24" y="387.57" width="23.25" height="135.83"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="153.76" y="29.4" width="25.5" height="9"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="384.5" y="29.4" width="25.5" height="9"></Rect>
						<Rect id="Rectangle-Path" fill="#EAE086" x="199.03" y="251.74" width="23.49" height="271.67"></Rect>
						<Rect id="Rectangle-Path" fill="#E2A688" x="429.76" y="376.24" width="46.74" height="15"></Rect>
						<Rect id="Rectangle-Path" fill="#EAE086" x="429.76" y="391.24" width="23.49" height="132.17"></Rect>
						<Polygon id="Shape" fill="#E5BB88" points="499.99 343.9 476.75 343.9 453.25 343.9 429.76 343.9 429.76 376.24 453.25 376.24 476.75 376.24 499.99 376.24 523.24 376.24 523.24 343.9"></Polygon>
						<Rect id="Rectangle-Path" fill="#E2A688" x="476.5" y="376.24" width="46.74" height="15"></Rect>
						<Polygon id="Shape" fill="#E8CC87" points="499.99 391.24 476.5 391.24 453.25 391.24 453.25 523.4 476.5 523.4 499.99 523.4 523.24 523.4 523.24 391.24"></Polygon>
						<Polygon id="Shape" fill="#E8CC87" points="666.73 473.99 618.22 473.99 570.22 473.99 570.22 523.4 618.22 523.4 666.73 523.4 714.74 523.4 714.74 473.99"></Polygon>
						<Path d="M463.4,320.57 C463.422736,274.650223 498.194017,236.197888 543.88,231.57 C509.927948,228.152423 476.986874,244.338609 458.946559,273.303566 C440.906245,302.268522 440.906245,338.971478 458.946559,367.936434 C476.986874,396.901391 509.927948,413.087577 543.88,409.67 C498.158183,405.033819 463.37605,366.526263 463.4,320.57 L463.4,320.57 Z" id="Shape" fill="#E2A688"></Path>
						<Path d="M481.43,320.57 C481.439276,278.092456 511.295656,241.468573 552.9,232.9 C549.9,232.3 546.9,231.83 543.9,231.52 C498.210292,236.170027 463.45298,274.644276 463.45298,320.57 C463.45298,366.495724 498.210292,404.969973 543.9,409.62 C546.95,409.31 549.96,408.84 552.9,408.24 C511.295656,399.671427 481.439276,363.047544 481.43,320.57 L481.43,320.57 Z" id="Shape" fill="#E5BB88"></Path>
						<Rect id="Rectangle-Path" fill="#E2A688" x="714.74" y="387.57" width="23.25" height="135.83"></Rect>
						<Path d="M654.9,320.57 C654.922736,274.650223 689.694017,236.197888 735.38,231.57 C701.427948,228.152423 668.486874,244.338609 650.446559,273.303566 C632.406245,302.268522 632.406245,338.971478 650.446559,367.936434 C668.486874,396.901391 701.427948,413.087577 735.38,409.67 C689.658183,405.033819 654.87605,366.526263 654.9,320.57 L654.9,320.57 Z" id="Shape" fill="#E2A688"></Path>
						<Path d="M672.93,320.57 C672.939276,278.092456 702.795656,241.468573 744.4,232.9 C741.4,232.3 738.4,231.83 735.4,231.52 C689.710292,236.170027 654.95298,274.644276 654.95298,320.57 C654.95298,366.495724 689.710292,404.969973 735.4,409.62 C738.4,409.31 741.46,408.84 744.4,408.24 C702.795656,399.671427 672.939276,363.047544 672.93,320.57 Z" id="Shape" fill="#E5BB88"></Path>
						<Path d="M499.87,320.57 C499.876452,281.646281 525.036652,247.188449 562.11,235.33 C559.084216,234.360838 556.010061,233.549742 552.9,232.9 C511.297674,241.468067 481.44578,278.094533 481.44578,320.57 C481.44578,363.045467 511.297674,399.671933 552.9,408.24 C556.010061,407.590258 559.084216,406.779162 562.11,405.81 C525.036652,393.951551 499.876452,359.493719 499.87,320.57 L499.87,320.57 Z" id="Shape" fill="#E8CC87"></Path>
						<Ellipse id="Oval" fill="#EAE086" cx="562.11" cy="320.57" rx="62.25" ry="85.24"></Ellipse>
						<Path d="M691.37,320.57 C691.376452,281.646281 716.536652,247.188449 753.61,235.33 C750.584216,234.360838 747.510061,233.549742 744.4,232.9 C702.797674,241.468067 672.94578,278.094533 672.94578,320.57 C672.94578,363.045467 702.797674,399.671933 744.4,408.24 C747.510061,407.590258 750.584216,406.779162 753.61,405.81 C716.536652,393.951551 691.376452,359.493719 691.37,320.57 Z" id="Shape" fill="#E8CC87"></Path>
						<Ellipse id="Oval" fill="#EAE086" cx="753.61" cy="320.57" rx="62.25" ry="85.24"></Ellipse>
						<Rect id="Rectangle-Path" fill="#E2A688" x="546.48" y="458.99" width="168.25" height="15"></Rect>
						<Polygon id="Shape" fill="#E5BB88" points="672.89 426.65 631.05 426.65 588.76 426.65 546.48 426.65 546.48 458.99 588.76 458.99 631.05 458.99 672.89 458.99 714.74 458.99 714.74 426.65"></Polygon>
						<Rect id="Rectangle-Path" fill="#EAE086" x="546.73" y="473.99" width="23.49" height="49.42"></Rect>
					</G>
				</G>
			</Svg>
		)
	}
}
