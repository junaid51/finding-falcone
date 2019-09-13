import React from 'react';
import falcone from './api/falcone';
import { Header, MainContent} from './components';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            planets: [],
            vehicles: [],
            vehiclesOriginal: [],
            selectedDestinations: {
                destination1: "",
                destination2: "",
                destination3: "",
                destination4: "",
            },
            selectedVehicles: {
                vehicle1: "",
                vehicle2: "",
                vehicle3: "",
                vehicle4: ""
            },
            planetVehicles: {
                first: "",
                second: "",
                third: "",
                fourth: ""
            },
            timeTaken: 0,
            errorMessage: ""
        };
    };

    componentDidMount() {
        this.getFalconeData();
        this.postFalconeData();
    }
    
    getFalconeData = async() => {
        try {
            const planets = await falcone.get('planets');
            const vehicles = await falcone.get('vehicles');
            this.setState({
                planets: planets.data,
                vehicles: vehicles.data,
                vehiclesOriginal: vehicles.data
            });
        } catch (err) {
            console.log(err);
        }
    };

    postFalconeData = async() => {
        try {
            const response = await falcone.post('token');
        } catch(err) {
            console.log(err);
        }
    }

    handlePlanetChange = (event) => {
        const { name, value } = event.target;

        for (let objVal of Object.values(this.state.selectedDestinations)) {
            if(value.name === objVal.name) {
                this.setState({errorMessage: 'Cannot enter same planet'});
                return;
            }
        }

        this.setState(prev => ({
            ...prev,
            errorMessage: '',
            selectedDestinations: {
                ...prev.selectedDestinations,
                [name]: value
            }
        }));
    };

    handleVehicleChange = (event) => {
        const { name, value } = event.target;
        const number = name[name.length - 1];
        let planet = 'first';
        switch(number) {
            case "2" : planet = 'second';
            break;
            case "3" : planet = 'third';
            break;
            case "4" : planet = 'fourth';
            break;
            default:  planet = 'first';
        }
        const newVehicles = JSON.parse(JSON.stringify(this.state.vehiclesOriginal));
        this.setState(prev => ({
            planetVehicles : {
                ...prev.planetVehicles,
                [planet]: {
                    name: this.state.selectedDestinations[`destination${number}`].name,
                    distance: this.state.selectedDestinations[`destination${number}`].distance,
                    vehicle: value,
                    speed: this.state.vehiclesOriginal.find(f => f.name === value).speed
                }

            },
            selectedVehicles: {
                ...prev.selectedVehicles,
                [name]: value
            }
        }), () => {
                newVehicles.map(v => {
                    for (let objVal of Object.values(this.state.selectedVehicles)) {
                        if (objVal === v.name) {
                            v.total_no -= 1;
                        }
                    }
                });

                let timeTaken = 0;

                for (let objVal of Object.values(this.state.planetVehicles)) {
                    if(objVal) {
                        timeTaken += objVal.distance / objVal.speed;
                    }
                }
        
                this.setState({
                    errorMessage: '',
                    vehicles: newVehicles,
                    timeTaken
                    });
            });
    };

    onSubmit = () => {

        const data = {
            planet_names: [],
            vehicle_names: []
        };
        for (let val of Object.values(this.state.selectedDestinations)) {
            data.planet_names.push(val.name);
        }
        data['vehicle_names'] = Object.values(this.state.selectedVehicles);
        console.log(data);

        Object.values(this.state.selectedDestinations).indexOf('') !== -1 ||
        Object.values(this.state.selectedVehicles).indexOf('') !== -1 ?
        this.setState({errorMessage: 'Please enter all the values!'}) :
        console.log('submitted');
    }

    render() {
        return (
            <div>
            <Header />
            <MainContent
                state={this.state}
                handlePlanetChange={this.handlePlanetChange}
                handleVehicleChange={this.handleVehicleChange}
                onSubmit={this.onSubmit}
            />
            </div>
        );
    };
};

export default App;