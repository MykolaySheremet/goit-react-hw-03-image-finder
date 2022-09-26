import { Component } from "react";
import { toast } from 'react-toastify';
import { SerchFormBox } from './Serchbar.styled';




export class Serchbar extends Component {
    state={
        pictures: '',
    }

    handleNameChange = (e) => {
        e.preventDefault();
        
        if (this.state.pictures.trim() === '') {
            return toast.error("Please input some name pictures to find ");
        }
        
        this.props.propSubmit(this.state.pictures);
        this.setState({ pictures: '' });

   
    }

    handleInputChange = (e) => {

        this.setState({ pictures: e.currentTarget.value.toLowerCase()})
       
    }



    render() {
        return (<header className="searchbar">
            <SerchFormBox
                onSubmit={this.handleNameChange}>
                        <button type="submit" className="button">
                            <span className="button-label">Search</span>
                        </button>

                        <input onChange={this.handleInputChange}
                    className="input"
                    type="text"
                    value={this.state.pictures}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                    </SerchFormBox>
                </header>)
    }
}