import React, { Component } from 'react';
import Like from './commons/like';
import Pagination from './commons/paginaion';
import ListGroup from './commons/listGroup';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import {filter} from '../utils/filter';

class Movies extends Component {
    state = {
        movies: getMovies(),
        genres: getGenres(),
        currentPage: 1,
        pageSize: 5,
        selectedGenre: "all"
    }
    handleDelete = (movieId) => {
        this.setState({
            movies: this.state.movies.filter(movie => movie._id !== movieId)
        });
    }
    changeLiked = (id) => {
        const movies = this.state.movies;
        const movie = movies.find((movie) => movie._id === id);
        movie.liked = !movie.liked;
        this.setState({
            movies: movies
        })
    }
    changePage = (page) => {
        this.setState({
            currentPage: page
        });
    }
    chnageGenre = (genre) => {
        this.setState({
            selectedGenre: genre
        })
    }
    // prepareMovies = () => {
    //     const start = (this.state.currentPage - 1) * this.state.pageSize;
    //     let end = this.state.currentPage * this.state.pageSize;
    //     end = end > this.state.movies.length ? this.state.movies.length : end;
    //     const movies = this.state.movies.slice(start, end);
    //     return {
    //         movies: movies,
    //         start: start + 1,
    //         end: end
    //     };
    // }

    render() {
        let movies = filter(this.state.movies, 'genre.name', this.state.selectedGenre);
        movies = paginate(movies, this.state.currentPage, this.state.pageSize);
        return (
            <>
                {this.state.movies.length === 0 && <h4>No movies to show</h4>}
                {this.state.movies.length > 0 &&
                    <div className='row'>
                        <div className="col-3">
                            <ListGroup items={this.state.genres} selected={this.state.selectedGenre} onSelect={this.chnageGenre} />
                        </div>
                        <div className="col-9">

                            {/* <h5>Showing {start}-{end} of {this.state.movies.length} movies in database.</h5> */}


                            <h5>Showing {movies.length} movies from database.</h5>
                            <table className='table table-hover'>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Genre</th>
                                        <th>InStock</th>
                                        <th>Price Rate</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map(movie => {
                                        return (
                                            <tr key={movie._id}>
                                                <td>{movie.title}</td>
                                                <td>{movie.genre.name}</td>
                                                <td>{movie.numberInStock}</td>
                                                <td>{movie.dailyRentalRate}</td>
                                                <td><Like id={movie._id} liked={movie.liked} changeLiked={this.changeLiked} /></td>
                                                <td><button className='btn btn-warning btn-sm' onClick={() => this.handleDelete(movie._id)}>Remove</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <Pagination pageSize={this.state.pageSize} dataSize={this.state.movies.length} currentPage={this.state.currentPage} onPageChange={this.changePage} />
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default Movies;