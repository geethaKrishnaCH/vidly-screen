import { Component } from 'react';

// page-size
// data-length
// should emit the page number

class Pagination extends Component {

  handlePageChange = (page, pageCount) => {
    if (page === 0 || page > pageCount) {
      return;
    }
    this.props.onPageChange(page);
  }

  render() {

    const { pageSize, dataSize, pageNumber } = this.props;

    const pageCount = dataSize % pageSize === 0 ? dataSize / pageSize : parseInt(dataSize / pageSize) + 1;
    const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    console.log(pageNumber === pageCount, pageNumber, pageCount);

    return (
      <nav aria-label="navigation">
        <ul className="pagination justify-content-end">
          <li className={"page-item" + (pageNumber === 1 ? ' disabled' : '')} onClick={() => this.handlePageChange(pageNumber - 1, pageCount)}><a className="page-link">Previous</a></li>
          {pages.map(page => {
            return <li key={page} className={'page-item' + (page === pageNumber ? ' active' : '')} onClick={() => this.handlePageChange(page, pageCount)} ><a className='page-link'>{page}</a></li>
          })}
          <li className={"page-item" + (pageNumber === pageCount ? ' disabled' : '')} onClick={() => this.handlePageChange(pageNumber + 1, pageCount)}><a className="page-link">Next</a></li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;