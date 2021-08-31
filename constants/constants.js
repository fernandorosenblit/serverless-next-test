
// App common constants

export const SUPPORTED_LANGUAGES = ['en'];
export const DEFAULT_LANGUAGE = 'en';

export const CAROUSEL_THRESHOLD = 5;
export const IMAGE_EXT = 'webp';

export const CURRENCY = 'usd';
export const COUNTRY = 'US';

export const FEATURED_MOVIE_DIMENSIONS = {
  width: 1280,
  height: 720
};

export const MOVIE_CARD_DIMENSIONS = {
  width: 168,
  height: 252
};

export const FEATURED_MOVIE_ASPECT_RATIO =
  (100 * FEATURED_MOVIE_DIMENSIONS.height) / FEATURED_MOVIE_DIMENSIONS.width;

export const MOVIE_CARD_ASPECT_RATIO =
  (100 * MOVIE_CARD_DIMENSIONS.height) / MOVIE_CARD_DIMENSIONS.width;

export const DEFAULT_LAT = 34.0983425;
export const DEFAULT_LNG = -118.3267434;
export const DEFAULT_LOCATION = 'Hollywood, CA';

export const DEFAULT_SEARCH_RADIUS = 24140.2;
export const SECONDARY_SEARCH_RADIUS = 48280.4;

export const SCREEN_SIZES = {
  s: 'small',
  m: 'medium',
  l: 'large',
  xl: 'extra large'
};

export const DATE_FORMAT = {
  day: 'ddd',
  month: 'MMM',
  monthWithDay: 'MMM D',
  showtime: 'h:mm A'
};

export const INITIAL_VENUES_COUNT = 5;
export const SHOW_MORE_VENUES_COUNT = 5;

export const IPIFY_URL = 'https://api.ipify.org/?format=json';

export const SEARCH_RESULTS_CATEGORIES = {
  movies: 'movie',
  theatres: 'venue',
  locations: 'geoLocation'
};

export const REDUX_BUILD_OPTIONS = { ignoreLinks: true, eager: true };

export const FILTER_VENUE_OPTIONS = [
  { label: 'filter.distance', value: 'distance' },
  { label: 'filter.name', value: 'displayName' }
];

export const LOCATION_ID = 'location';

export const ENTER_KEY = 'Enter';

export const PAYMENT_METHOD = {
  creditCard: 'credit-card',
  googlePay: 'google-pay-wallet',
  applePay: 'apple-pay-wallet'
};

export const STRIPE_PAYMENT_METHOD = {
  googlePay: 'googlePay',
  applePay: 'applePay'
};

export const FORM_IDS = {
  stripeCheckout: 'stripe-checkout-form'
};

export const STRIPE_INPUT_IDS = {
  cardName: 'cardHolderName',
  cardNumber: 'cardNumber',
  cardExpDate: 'cardExpiry',
  cardCvc: 'cardCvc',
  cardReceiptEmail: 'stripeCardEmail'
};
