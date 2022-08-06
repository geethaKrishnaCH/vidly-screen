import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    }

    handleDelete = (movieId) => {
        this.setState({
            movies: this.state.movies.filter(movie => movie._id !== movieId)
        })
    }

    render() {
        return (
            <>
                {this.state.movies.length === 0 && <h4>No movies to show</h4>}
                {this.state.movies.length > 0 &&
                    <div>
                        <h4>Showing {this.state.movies.length} movies in database.</h4>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>InStock</th>
                                    <th>Price Rate</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies.map(movie => {
                                    return (
                                        <tr key={movie._id}>
                                            <td>{movie.title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{movie.numberInStock}</td>
                                            <td>{movie.dailyRentalRate}</td>
                                            <td><button className='btn btn-warning btn-sm' onClick={() => this.handleDelete(movie._id)}>Remove</button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                }
            </>
        );
    }
}

export default Movies;