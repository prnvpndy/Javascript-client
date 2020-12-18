// eslint-disable-next-line import/no-unresolved
export const PUBLIC_IMAGE_FOLDER = '/images/';
export const DEFAULT_BANNER_IMAGE = '/images/Banners/default.png';
export const banners = ['Banners/cloud.jpg', 'Banners/dns-server.png', 'Banners/js.jpg', 'Banners/full-stack-web-development.jpg', 'Banners/load-balancer.png'];
export const total = banners.length;

const selectOptions = [
  {
    label: 'Cricket',
    value: 'cricket',
  },
  {
    label: 'Football',
    value: 'football',
  },
];
const radioOptionsCricket = [
  {
    label: 'Wicket Keeper',
    value: 'wicket keeper',
  },
  {
    label: 'Batsman',
    value: 'batsman',
  },
  {
    label: 'Bowler',
    value: 'bowler',
  },
  {
    label: 'All Rounder',
    value: 'all rounder',
  },
];

const radioOptionsFootball = [
  {
    label: 'Striker',
    value: 'striker',
  },
  {
    label: 'Defender',
    value: 'defender',
  },
];
export { selectOptions, radioOptionsCricket, radioOptionsFootball };
