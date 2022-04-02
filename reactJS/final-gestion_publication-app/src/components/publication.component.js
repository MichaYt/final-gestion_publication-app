import React, { Component } from "react";
import PublicationDataService from "../services/publication.service";

export default class Publication extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getPublication = this.getPublication.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updatePublication = this.updatePublication.bind(this);
        this.deletePublication = this.deletePublication.bind(this);
        this.state = {
            currentPublication: {
                id: null,
                title: "",
                description: "",
                published: false
            },
            message: ""
        };
    }
    componentDidMount() {
        this.getPublication(this.props.match.params.id);
    }
    onChangeTitle(e) {
        const title = e.target.value;
        this.setState(function (prevState) {
            return {
                currentPublication: {
                    ...prevState.currentPublication,
                    title: title
                }
            };
        });
    }
    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentPublication: {
                ...prevState.currentPublication,
                description: description
            }
        }));
    }
    getPublication(id) {
        PublicationDataService.get(id)
            .then(response => {
                this.setState({
                    currentPublication: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updatePublished(status) {
        var data = {
            id: this.state.currentPublication.id,
            title: this.state.currentPublication.title,
            description: this.state.currentPublication.description,
            published: status
        };
        PublicationDataService.update(this.state.currentPublication._id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentPublication: {
                        ...prevState.currentPublication,
                        published: status
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updatePublication() {
        PublicationDataService.update(
            this.state.currentPublication._id,
            this.state.currentPublication
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "La publication a été mis à jour avec succés!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    deletePublication() {
        PublicationDataService.delete(this.state.currentPublication._id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/publications')
            })
            .catch(e => {
                console.log(e);
            });
    }
    // ...
    render() {
        const { currentPublication } = this.state;
        return (
            <div>
                {currentPublication ? (
                    <div className="edit-form">
                        <h4>Publication</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Titre</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentPublication.title}
                                    onChange={this.onChangeTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentPublication.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentPublication.published ? "Publiée" : "En attente"}
                            </div>
                        </form>
                        {currentPublication.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                Pas publier
                            </button>
                        ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publier
                                </button>
                            )}
                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deletePublication}
                        >
                            Supprimer
                        </button>
                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updatePublication}
                        >
                            Mettre à jour
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Cliquer sur la publication</p>
                        </div>
                    )}
            </div>
        );
    }
}