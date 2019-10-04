import React, { Component } from 'react';

export default class About extends Component {

	constructor(props) {
		super(props);
		this.scrollIntoFocus = React.createRef();
	}

	componentDidMount() {
		if(this.scrollIntoFocus.current){
            this.scrollIntoFocus.current.scrollIntoView({ 
               behavior: "smooth", 
               block: "start"
            })
        }
	}

	render () {

		return (

		<div className= "about-wrapper" ref={this.scrollIntoFocus}>

			<figure className="aboutFigure bees">

				<img className="about-photo" src={ require ('./img/keepers.jpg') } alt="bee keepers" />

			</figure>

			<p className="about-text"><span className="title-first">NOLA</span> <span className="title-second">honey</span> was founded in 2018. We are locally owned and operated, organic raw honey producers. 
			We believe in  doing things nature’s way without the use of chemicals.</p>

			<figure className="aboutFigure">

				<img className="about-photo" src={ require ('./img/holding.jpg') } alt="bee keeper holding a beehive frame" />

			</figure>

			<p className="about-text"><span className="title-first">OUR</span> <span className="title-second">mission</span> is to provide the Greater New Orleans Area with the pure, sweet taste of local honey. 
			Our honey is as good for your health as it is to your tummy. <img src={ require ('./img/yummy.png') }  alt="yum emoji"/></p>

			<figure className="aboutFigure">

				<img className="about-photo" src={ require ('./img/bees.jpg') } alt="close up of bees on a frame" />
		
			</figure>

			<div className="accredit">Icon made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>

		</div>

		)

	}

}
