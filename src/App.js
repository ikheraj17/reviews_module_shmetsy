import React from 'react';
// import './App.css';
import ReviewList from './components/ReviewList.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 1,
      reviews: [
        {username: 'Master Chief', reviewDate: 'Apr 6, 2020', productID: 3, review: 'Great seller! I bought customizeable water bottles and love them', rating: 4.9},
        {username: 'grandma', reviewDate: 'Apr 6, 2020', productID: 2, review: 'I am not sure why I am writing a review...I did not purchase anything...I think', rating: 4.3},
        {username: 'Justin Verlander', reviewDate: 'Apr 3, 2020', productID: 2, review: 'I am amazing at baseball. What can I say?', rating: 4.2},
        {username: 'James Bond', reviewDate: 'Apr 2, 2020', productID: 2, review: 'I love these sunglasses more than anything. It allows me to spy on my targets unnoticed', rating: 4.2},
        {username: 'ikhe', reviewDate: 'Apr 1, 2020', productID: 2, review: 'loeoic asjfhladkj  adhgasdahbd asdhailfjablfij dfbsdfkdbjffkjbfafad foafhfa afjafkjf', rating: 3.5},
        {username: 'John Jacob', reviewDate: 'Apr 29, 2020', productID: 1, review: 'This mask is literally the best thing I have purchased in my entire 40 years of life. Just buy it...NOW', rating: 5.0},
        {username: 'Jingleheimer Schmidt', reviewDate: 'Apr 27, 2020', productID: 1, review: 'Honestly, my brother John told me to get this mask and I have to say I am very happy. The quality is amazing! Outside of wishing there were more color options, I am satisfied and would recommend this product', rating: 4.1},
        {username: 'Lebron James', reviewDate: 'Apr 20, 2020', productID: 1, review: 'Cool mask I guess...It fits well but tends to get a little uncomfortable over long periods.One day I hope I can stop wearing these things.', rating: 4.3},
        {username: 'FBI Agent', reviewDate: 'Apr 18, 2020', productID: 1, review: 'I bought this mask to help disguise my identity...and it did not work. I was on a super important mission and had to abort. Would not recommend this product', rating: 1.0},
        {username: 'Dolly Parton', reviewDate: 'Apr 16, 2020', productID: 1, review: 'I bought these for my family and we could not be happier! This is an essential product to practice safety in these times', rating: 5.0},
        {username: 'Darth Vader', reviewDate: 'Apr 15, 2020', productID: 1, review: 'I already need to breathe using a filter, and my friends complain about my loud breathing sounds. I bought this mask to practice safety, but now my breathing sounds are even louder!', rating: 2.0},
        {username: 'Ash Ketchum', reviewDate: 'Apr 13, 2020', productID: 1, review: 'I bought this so I could keep cathching pokemon during this crisis. Unfortunately, the durablity of this mask is not great... A pidgey pecked right through this in a matter of seconds.', rating: 2.5},
        {username: 'Ronnie Coleman', reviewDate: 'Apr 12, 2020', productID: 1, review: 'This mask is straight up LIGHT WEIGHT. I wear it when I workout to look super cool. I would recommend this product.', rating: 4.3},
        {username: 'Seth Rogen', reviewDate: 'Apr 10, 2020', productID: 1, review: 'Insert signature Seth laugh here. This mask is awesome! My one gripe is that I wish there were alternate sizes for my large head.', rating: 3.8},
        {username: 'Batman', reviewDate: 'Apr 8, 2020', productID: 1, review: 'This mask helps me fight crime in Gotham while maintaining a certain standard of hygeine. It flies off sometimes when I dive off skyscrapers, but still is good for the price.', rating: 4.1},
    ],
      displayed: [],
      sIndex: 0,
      eIndex: 4,
      shopReviews: [],
      prodReviews: [],
      onProd: true,
      len: 1,
      current: '',
      numProdRev: 1,
      avgShopRating: 0,
      classProd: "selected",
      classShop: "unselected",
      last: 0,
    }
    this.filterProductReviews = this.filterProductReviews.bind(this);
    this.filterShopReviews = this.filterShopReviews.bind(this);
    this.onNextReviews = this.onNextReviews.bind(this);
    this.onPreviousReviews = this.onPreviousReviews.bind(this);
    this.onPageOneClick = this.onPageOneClick.bind(this);
    this.onLastPageClick = this.onLastPageClick.bind(this);
  }

  componentDidMount() {
    const uniqueID = window.location.pathname.substring(1,2);
    this.setState({
      current: 1,
      shopReviews: this.state.reviews,
      len: this.state.reviews.length,
    }, () => {
      this.filterProductReviews();
      this.getAverageShopReview();
    });

  }

  // getReviews() {
  //   axios.get(`/reviews/${this.state.current}`)
  //     .then(res => {
  //       this.setState({
  //         reviews: res.data,
  //         shopReviews: res.data,
  //       })
  //     }).catch((err) => {
  //       console.log("There was an error fetching data");
  //     }).then(() => {
  //       this.getShopReviewCount();
  //     }).then(() => {
  //       this.filterProductReviews();
  //     }).then(() => {
  //       this.getAverageShopReview();
  //     }).then(() => {
  //       let slice = this.state.reviews.slice(0,4);
  //       this.setState({
  //         displayed: slice
  //       })
  //     })
  // }

  getShopReviewCount () {
    const len = this.state.shopReviews.length;
    this.setState({
      len: len
    })
  }

  filterProductReviews() {
    const prodRevs = [];
    const allRevs = this.state.reviews;
    const curr = this.state.current;
    allRevs.forEach(rev => {
      if (rev.productID == curr) {
        prodRevs.push(rev);
      }
    });
    let max = Math.floor(prodRevs.length / 4) + 1;
    this.setState({
      reviews: prodRevs,
      numProdRev: prodRevs.length,
      displayed: prodRevs.slice(0,4),
      sIndex: 0,
      eIndex: 4,
      prodReviews: prodRevs,
      onProd: true,
      counter: 1,
      classProd: "selected",
      classShop: "unselected",
      last: max,
    })
  }

  filterShopReviews() {
    const shopRevs = this.state.shopReviews;
    let max = Math.floor(shopRevs.length / 4) + 1;
    this.setState({
      displayed: shopRevs.slice(0,4),
      sIndex: 0,
      eIndex: 4,
      onProd: false,
      counter: 1,
      classShop: "selected",
      classProd: "unselected",
      last: max
    })
  }

  getAverageShopReview() {
    const shopRevs = this.state.shopReviews;
    let total = 0;
    shopRevs.forEach((rev) => {
      total += rev.rating;
    })
    let avg = total/this.state.len;
    this.setState({
      avgShopRating: avg
    })
  }

  onNextReviews() {
    if(this.state.onProd === true) {
      let counter = this.state.counter;
      let productRevLength = this.state.prodReviews.length;
      let maxPresses = Math.floor(productRevLength / 4);
      console.log(maxPresses);
      if(counter <= maxPresses) {
        let start = this.state.sIndex + 4;
        let end = this.state.eIndex + 4;
        let next = this.state.prodReviews.slice(start, end);
        counter ++;
        this.setState({
          counter: counter,
          sIndex: start,
          eIndex: end,
          displayed: next,
        })
      }
    } else {
      let counter = this.state.counter;
      let shopRevLength = this.state.shopReviews.length;
      let maxPresses = Math.floor(shopRevLength / 4);
      if(counter <= maxPresses) {
        let start = this.state.sIndex + 4;
        let end = this.state.eIndex + 4;
        let next = this.state.shopReviews.slice(start, end);
        counter ++;
        this.setState({
          counter: counter,
          sIndex: start,
          eIndex: end,
          displayed: next,
        })
      }
    }
  }

  onPreviousReviews() {
    if(this.state.onProd === true) {
      let counter = this.state.counter;
      let productRevLength = this.state.prodReviews.length;
      let maxPresses = Math.floor(productRevLength / 4);
      if(counter > 1) {
        let start = this.state.sIndex - 4;
        let end = this.state.eIndex - 4;
        let next = this.state.prodReviews.slice(start, end);
        counter --;
        this.setState({
          counter: counter,
          sIndex: start,
          eIndex: end,
          displayed: next,
        })
      }
    } else {
      let counter = this.state.counter;
      let shopRevLength = this.state.shopReviews.length;
      let maxPresses = Math.floor(shopRevLength / 4);
      if(counter > 1) {
        let start = this.state.sIndex - 4;
        let end = this.state.eIndex - 4;
        let next = this.state.shopReviews.slice(start, end);
        counter --;
        this.setState({
          counter: counter,
          sIndex: start,
          eIndex: end,
          displayed: next,
        })
      }
    }
  }

  onPageOneClick () {
    if(this.state.onProd === true) {
        let first = this.state.prodReviews.slice(0, 4);
        this.setState({
          counter: 1,
          sIndex: 0,
          eIndex: 4,
          displayed: first,
        })
      } else {
        let first = this.state.shopReviews.slice(0, 4);
        this.setState( {
          counter: 1,
          sIndex: 0,
          eIndex: 4,
          displayed: first,
        })
      }
    }

    onLastPageClick () {
      if(this.state.onProd === true) {
        let test = 4 * this.state.last;
        let end = this.state.prodReviews.length;
        let start = end % 4;
        let evenLast = this.state.prodReviews.slice(end - 4, end);
        let last = this.state.prodReviews.slice(end - start, test);
        let lastPage = Math.floor(end / 4) + 1;
        if(start !== 0) {
          this.setState({
            counter: lastPage,
            sIndex: test - 4,
            eIndex: test,
            displayed: last,
          })
        } else {
          this.setState({
            counter: lastPage,
            sIndex: end - 4,
            eIndex: end,
            displayed: evenLast,
          })
        }

      } else {
        let test = 4 * this.state.last;
        let end = this.state.shopReviews.length;
        let start = end % 4;
        let evenLast = this.state.shopReviews.slice(end - 4, end);
        let last = this.state.shopReviews.slice(end - start, test);
        let lastPage = Math.floor(end / 4) + 1;
        if(start !== 0) {
          this.setState({
            counter: lastPage,
            sIndex: test - 4,
            eIndex: test,
            displayed: last,
          })
        } else {
          this.setState({
            counter: lastPage,
            sIndex: end - 4,
            eIndex: end,
            displayed: evenLast,
          })
        }
      }
    }






  render() {
    return (<div className="reviews-container">
      <ReviewList
      reviews={this.state.displayed}
      current={this.state.current}
      total={this.state.len}
      shop={this.state.numProdRev}
      filterProductReviews={this.filterProductReviews}
      filterShopReviews={this.filterShopReviews}
      avg={this.state.avgShopRating}
      next={this.onNextReviews}
      previous={this.onPreviousReviews}
      page={this.state.counter}
      classy={this.state.classProd}
      unselected={this.state.classShop}
      last={this.state.last}
      pageOne={this.onPageOneClick}
      pageLast={this.onLastPageClick}
      />
    </div>)
  }

};

export default App;
