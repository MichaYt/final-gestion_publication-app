import React, { Component } from "react";
import PublicationDataService from "../services/publication.service";
import { Link } from "react-router-dom";

export default class PublicationsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.retrievePublications = this.retrievePublications.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActivePublication = this.setActivePublication.bind(this);
        this.removeAllPublications = this.removeAllPublications.bind(this);
        this.searchTitle = this.searchTitle.bind(this);
        this.state = {
            publications: [],
            currentPublication: null,
            currentIndex: -1,
            searchTitle: ""
        };
    }
    componentDidMount() {
        this.retrievePublications();
    }
    onChangeSearchTitle(e) {
        const searchTitle = e.target.value;
        this.setState({
            searchTitle: searchTitle
        });
    }
    retrievePublications() {
        PublicationDataService.getAll()
            .then(response => {
                this.setState({
                    publications: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrievePublications();
        this.setState({
            currentPublication: null,
            currentIndex: -1
        });
    }
    setActivePublication(publication, index) {
        this.setState({
            currentPublication: publication,
            currentIndex: index
        });
    }
    removeAllPublications() {
        PublicationDataService.deleteAll()
            .then(response => {
                console.log(response.data)
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    searchTitle() {
        PublicationDataService.findByTitle(this.state.searchTitle)
            .then(response => {
                this.setState({
                    publications: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {

        const { searchTitle, publications, currentPublication, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Insérer le titre"
                            value={searchTitle}
                            onChange={this.onChangeSearchTitle}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchTitle}
                            >
                                Recherche
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Liste des publications</h4>
                    <ul className="list-group">
                        {publications &&
                            publications.map((publication, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActivePublication(publication, index)}
                                    key={index}
                                >
                                    {publication.title}
                                </li>
                            ))}
                    </ul>
                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllPublications}
                    >
                        Tout supprimer
                    </button>
                </div>
                <div className="col-md-6">
                    {currentPublication ? (
                        <div>
                            <h4>Publication</h4>
                            <div>
                                <label>
                                    <strong>Titre:</strong>
                                </label>{" "}
                                {currentPublication.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentPublication.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentPublication.published ? "Publiée" : "En attente"}
                            </div>
                            <Link
                                to={"/publications/" + currentPublication._id}
                                className="badge badge-warning"
                            >
                                Modifier
                            </Link>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Cliquer sur la publication</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}
