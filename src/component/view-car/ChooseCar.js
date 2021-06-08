import './css/bootstrap-grid.css'
import carsInfo from './arrayFeatures.json'
import wheelsInfo from './wheels.json'
import style from './css/Style.module.css'

import React, { Component } from 'react'

export default class Main extends Component {

    state = {
        carIndex: 0,
        wheelIndex: 0,
    }

    componentDidMount = () => {

        const tabScript = document.createElement('script')
        tabScript.src = 'https://cdn.scaleflex.it/plugins/js-cloudimage-360-view/2.6.0/js-cloudimage-360-view.min.js'
        document.getElementById('cloudimage-360-scripts').appendChild(tabScript)
    }

    componentDidUpdate = () => {

        document.getElementById('cloudimage-360').innerHTML = ''
        document.getElementById('cloudimage-360-scripts').innerHTML = ''

        const tabScript = document.createElement('script')
        tabScript.src = 'https://cdn.scaleflex.it/filerobot/js-cloudimage-360-view/v2.0.0.lazysizes.min.js'
        document.getElementById('cloudimage-360-scripts').appendChild(tabScript)
    }

    renderCarInfo = () => {
        const car = carsInfo[this.state.carIndex]
        const wheel = wheelsInfo[this.state.wheelIndex]

        let carImg = car.wheels.find((wheelItem) => {
            return wheelItem.idWheel === wheel.idWheel
        }).srcImg

        let imgFolder = carImg.slice(0, carImg.lastIndexOf('/') + 1)
        let imgFile = 'civic-{index}.jpg'        

        return (
            <div className={style['car-info']}>
                <div className={style['car-info__image']}>
                    <div
                        id="cloudimage-360"
                        className="cloudimage-360"
                        data-folder={imgFolder}
                        data-filename={imgFile}
                        data-amount="8"
                    ></div>
                    <div id="cloudimage-360-scripts"></div>
                </div>

                <div className={style['car-info__detail']}>
                    <h3 className={style['title']}>See More Features</h3>
                    <table className={style['info-table']}>
                        <tbody>
                            <tr>
                                <th>Color</th>
                                <td>{car.color}</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>{car.price}</td>
                            </tr>
                            <tr>
                                <th>Engine Type</th>
                                <td>{car.engineType}</td>
                            </tr>
                            <tr>
                                <th>Displacement</th>
                                <td>{car.displacement}</td>
                            </tr>
                            <tr>
                                <th>Horsepower</th>
                                <td>{car.horsepower}</td>
                            </tr>
                            <tr>
                                <th>Torque</th>
                                <td>{car.torque}</td>
                            </tr>
                            <tr>
                                <th>Redline</th>
                                <td>{car.redline}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    setActiveColorIndex = (index) => {
        if (index !== this.state.carIndex) {
            this.setState({carIndex: index})
        }
    }

    setActiveWheelIndex = (index) => {
        if (index !== this.state.wheelIndex) {
            this.setState({wheelIndex: index})
        }
    }

    renderCarColorItems = () => {
        return carsInfo.map((car, index) => {
            
            let className = style['cars-color__item']
            if (this.state.carIndex === index) {
                className += ' ' + style['active'] 
            }

            return (
                <div className={className} key={index} onClick={() => {this.setActiveColorIndex(index)}}>
                    <div className={style['image']}>
                        <img src={car.img} alt="color icon" />
                    </div>
                    <div className={style['info']}>
                        <h3 className={style['name']}>{car.title}</h3>
                        <h3 className={style['material']}>{car.type}</h3>
                    </div>
                </div>
            )
        })
    }

    renderWheelItems = () => {
        return wheelsInfo.map((wheel, index) => {

            let className = style['wheels__item']
            if (this.state.wheelIndex === index) {
                className += ' ' + style['active']
            }

            return (
                <div className={className} key={index} onClick={() => {this.setActiveWheelIndex(index)}}>
                    <div className={style['image']}>
                        <img src={wheel.img} alt="Wheel" />
                    </div>
                    <div className={style['info']}>
                        <h3 className={style['name']}>{wheel.title}</h3>
                        <h3 className={style['price']}>{wheel.price}</h3>
                    </div>
                </div>
            )
        })
    }

    renderExteriorColor = () => {
        return (
            <div className={style['cars-color']}>
                <div className={style['cars-color__header']}>
                    <h3 className={style['title']}>Exterior Color</h3>
                </div>                
                <div className={style['cars-color__body']}>
                    {this.renderCarColorItems()}
                </div>                              
            </div>
        )
    }

    renderWheels = () => {
        return (
            <div className={style['wheels']}>
                <div className={style['wheels__header']}>
                    <h3 className={style['title']}>Wheels</h3>
                </div>
                <div className={style['wheels__body']}>
                    {this.renderWheelItems()}
                </div>
            </div>
        )
    }

    render() {

        return (
            <div className={style['wrapper']}>
                <div className={`container ${style['py-48']}`}>
                    <div className="row">
                        <div className="col-8">
                            { this.renderCarInfo() }
                        </div>
                        <div className="col-4">
                            { this.renderExteriorColor() }
                            { this.renderWheels() }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
