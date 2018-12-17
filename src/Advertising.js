import React, { Component } from 'react';
import './Bank.css';

class Advertising extends Component {
    constructor() {
        super();
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div className="reclam">
                    <img alt="shark not found" height='200px' src="./shark.jpg" />
                    <p>купание с акулками</p>
                </div>
                <div className="reclam">
                    <img alt="shark not found" height='200px' src="./shark.jpg" />
                    <p>купание с акулками</p>
                </div>
                <div className="reclam">
                    <img alt="shark not found" height='200px' src="./shark.jpg" />
                    <p>купание с акулками</p>
                </div>
                <div className="reclam">
                    <img alt="shark not found" height='200px' src="./shark.jpg" />
                    <p>купание с акулками</p>
                </div>
            </div>
        );
    }
}

export default Advertising;
