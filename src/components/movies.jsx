import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from './commons/like';
import Pagination from './commons/paginaion';

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageNumber: 1,
        pageSize: 8
    }
    handleDelete = (movieId) => {
        this.setState({
            movies: this.state.movies.filter(movie => movie._id !== movieId)
        })
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
            pageNumber: page
        });
    }
    prepareMovies = () => {
        const start = (this.state.pageNumber - 1) * this.state.pageSize;
        let end = this.state.pageNumber * this.state.pageSize;
        end = end > this.state.movies.length ? this.state.movies.length : end;
        console.log(start, end);
        const movies = this.state.movies.slice(start, end);
        return {
            movies: movies,
            start: start+1,
            end: end
        };
    }

    render() {
        const { movies, start, end } = this.prepareMovies();
        console.log(movies);
        return (
            <>
                {this.state.movies.length === 0 && <h4>No movies to show</h4>}
                {this.state.movies.length > 0 &&
                    <div>
                        <h5>Showing {start}-{end} of {this.state.movies.length} movies in database.</h5>
                        <table className='table'>
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
                        <Pagination pageSize={this.state.pageSize} dataSize={this.state.movies.length} pageNumber={this.state.pageNumber} onPageChange={this.changePage} />
                    </div>
                }
            </>
        );
    }
}

export default Movies;