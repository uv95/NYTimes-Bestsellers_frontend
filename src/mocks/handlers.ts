import { http } from 'msw';
import { BASE_URL } from '../utils/consts';

export const handlers = [
  // rest.post(BASE_URL + 'users/login', (req, res, ctx) => {
  //   localStorage.setItem('userLoggedIn', 'true');
  //   return res(ctx.json({ data: { data: { user: 'user' } } }));
  // }),
  http.get(`${BASE_URL}/books`, async () => {
    return new Response(
      JSON.stringify({
        status: 'OK',
        copyright:
          'Copyright (c) 2024 The New York Times Company. All Rights Reserved.',
        num_results: 1,
        results: {
          books: [
            {
              rank: 1,
              rank_last_week: 0,
              weeks_on_list: 1,
              asterisk: 0,
              dagger: 0,
              primary_isbn10: '1250874099',
              primary_isbn13: '9781250874091',
              publisher: 'Flatiron',
              description:
                'A woman who has been missing for five years reappears with no memory of what happened to her.',
              price: '0.00',
              title: 'THE WOMAN IN ME',
              author: 'Britney Spears',
              contributor: 'by Britney Spears',
              contributor_note: '',
              book_image:
                'https://storage.googleapis.com/du-prd/books/images/1250874099.jpg',
              book_image_width: 328,
              book_image_height: 500,
              amazon_product_url:
                'https://www.amazon.com/dp/1250874099?tag=NYTBSREV-20',
              age_group: '',
              book_review_link: '',
              first_chapter_link: '',
              sunday_review_link: '',
              article_chapter_link: '',
              isbns: [
                {
                  isbn10: '1250874099',
                  isbn13: '9781250874091',
                },
              ],
              buy_links: [
                {
                  name: 'Amazon',
                  url: 'https://www.amazon.com/dp/1250874099?tag=NYTBSREV-20',
                },
                {
                  name: 'Apple Books',
                  url: 'https://goto.applebooks.apple/9781250874091?at=10lIEQ',
                },
                {
                  name: 'Barnes and Noble',
                  url: 'https://www.anrdoezrs.net/click-7990613-11819508?url=https%3A%2F%2Fwww.barnesandnoble.com%2Fw%2F%3Fean%3D9781250874091',
                },
                {
                  name: 'Books-A-Million',
                  url: 'https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fp%252FTHE%252BWOMAN%252BIN%252BME%252FBritney%252BSpears%252F9781250874091&url2=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-7990613-35140%3Furl%3Dhttps%253A%252F%252Fwww.booksamillion.com%252Fsearch%253Fquery%253DTHE%252BWOMAN%252BIN%252BME%252BBritney%252BSpears',
                },
                {
                  name: 'Bookshop',
                  url: 'https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fbookshop.org%2Fa%2F3546%2F9781250874091&url2=https%3A%2F%2Fbookshop.org%2Fbooks%3Fkeywords%3DTHE%2BWOMAN%2BIN%2BME%2BBritney%2BSpears',
                },
                {
                  name: 'IndieBound',
                  url: 'https://du-gae-books-dot-nyt-du-prd.appspot.com/redirect?url1=https%3A%2F%2Fwww.indiebound.org%2Fbook%2F9781250874091%3Faff%3DNYT&url2=https%3A%2F%2Fwww.indiebound.org%2Fsearch%2Fbook%3Fkeys%3DTHE%2BWOMAN%2BIN%2BME%2BBritney%2BSpears%26aff%3DNYT',
                },
              ],
              book_uri: 'nyt://book/00000000-0000-0000-0000-000000000000',
            },
          ],
        },
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }),
];
