export const RELS = {
  action: {
    actionType: 'actionType',
    items: 'items'
  },
  actionItem: {
    actionItemType: 'actionItemType'
  },
  event: {
    eventStatus: 'eventStatus',
    eventType: 'eventType',
    features: 'features',
    format: 'format',
    movie: 'movie',
    seatingPreview: 'seatingPreview',
    seatingType: 'seatingType',
    seatMap: 'seatMap',
    seats: 'seatMap.seatZones.seats',
    soldOutStatus: 'soldOutStatus',
    subVenueType: 'subVenueType',
    syndications: 'syndications',
    tickets: 'tickets',
    timeOfDay: 'timeOfDay',
    unavailableSeats: 'unavailableSeats',
    venue: 'venue'
  },
  eventSchedule: {
    movie: 'movie',
    venue: 'venue'
  },
  eventSyndication: {
    event: 'event',
    syndicator: 'syndicator'
  },
  exhibitor: {
    syndications: 'syndications',
    ticketTypes: 'ticketTypes',
    venues: 'venues'
  },
  exhibitorSyndication: {
    exhibitor: 'exhibitor',
    syndicator: 'syndicator'
  },
  feature: {
    imageContent: 'imageContent'
  },
  featureImageContent: {
    contentCategory: 'contentCategory'
  },
  featuredList: {
    items: 'items'
  },
  featuredListItem: {
    actions: 'actions',
    imageContent: 'imageContent',
    textContent: 'textContent'
  },
  featuredListItemImageContent: {
    contentCategory: 'contentCategory'
  },
  featuredListItemTextContent: {
    contentCategory: 'contentCategory'
  },
  geoLocation: {
    geoLocationType: 'geoLocationType'
  },
  geoLocationSearch: {
    geoLocation: 'geoLocation'
  },
  geoVenueSearch: {
    venue: 'venue'
  },
  movie: {
    events: 'events',
    eventSchedules: 'eventSchedules',
    features: 'features',
    formats: 'formats',
    genres: 'genres',
    imageContent: 'imageContent',
    ratings: 'ratings',
    releases: 'releases',
    releaseStatus: 'releaseStatus',
    syndications: 'syndications',
    textContent: 'textContent',
    videoContent: 'videoContent'
  },
  movieImageContent: {
    contentCategory: 'contentCategory'
  },
  movieRating: {
    ratingType: 'ratingType'
  },
  movieSyndication: {
    movie: 'movie',
    syndicator: 'syndicator'
  },
  movieTextContent: {
    contentCategory: 'contentCategory'
  },
  movieVideoContent: {
    contentCategory: 'contentCategory',
    videoPlayer: 'videoPlayer'
  },
  order: {
    events: 'events',
    status: 'status'
  },
  orderEvent: {
    eventType: 'eventType',
    features: 'features',
    format: 'format',
    movie: 'movie',
    seatingType: 'seatingType',
    seatMap: 'seatMap',
    source: 'source',
    status: 'status',
    subVenueType: 'subVenueType',
    tickets: 'tickets',
    timeOfDay: 'timeOfDay',
    venue: 'venue'
  },
  orderTicket: {
    source: 'source',
    status: 'status'
  },
  ratingType: {
    imageContent: 'imageContent'
  },
  ratingTypeImageContent: {
    contentCategory: 'contentCategory'
  },
  search: {
    geoLocation: 'geoLocation',
    movie: 'movie',
    venue: 'venue'
  },
  seatType: {
    imageContent: 'imageContent'
  },
  seatTypeImageContent: {
    contentCategory: 'contentCategory'
  },
  seatMap: {
    seatZones: 'seatZones'
  },
  seatZone: {
    seats: 'seats'
  },
  surcharge: {
    surchargeType: 'surchargeType'
  },
  syndicator: {
    eventSyndications: 'eventSyndications',
    exhibitorSyndications: 'exhibitorSyndications',
    movieSyndications: 'movieSyndications',
    venueSyndications: 'venueSyndications'
  },
  ticket: {
    surcharges: 'surcharges'
  },
  ticketType: {
    exhibitors: 'exhibitors',
    venues: 'venues'
  },
  translationContent: {
    contentCategory: 'contentCategory'
  },
  venue: {
    events: 'events',
    eventSchedules: 'eventSchedules',
    exhibitor: 'exhibitor',
    features: 'features',
    imageContent: 'imageContent',
    seatMaps: 'seatMaps',
    syndications: 'syndications',
    textContent: 'textContent',
    ticketTypes: 'ticketTypes',
    venueStatus: 'venueStatus',
    venueType: 'venueType'
  },
  venueImageContent: {
    contentCategory: 'contentCategory'
  },
  venueSyndication: {
    syndicator: 'syndicator',
    venue: 'venue'
  },
  venueTextContent: {
    contentCategory: 'contentCategory'
  }
};
