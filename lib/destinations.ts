export type Destination = {
  id: string; name: string; eyebrow: string; image: string; alt: string;
  description: string; rhythm: string; highlights: string[]; category: string;
};
export const destinations: Destination[] = [
  { id: 'himalaya', name: 'The Himalayas', eyebrow: 'HIGHER PERSPECTIVES', image: '/images/himalaya.jpg', alt: 'The snow-covered summit of Ama Dablam in the Nepal Himalayas at dawn', description: 'Cold morning air. A warm cup of tea. A trail that turns a corner and changes everything. Make time for the mountain villages and the small moments between the views.', rhythm: 'Slow trails & big horizons', highlights: ['Mountain village walks', 'Teahouse hospitality', 'Sunrise over the peaks'], category: 'Mountains' },
  { id: 'pokhara', name: 'Pokhara', eyebrow: 'A DIFFERENT KIND OF STILL', image: '/images/pokhara.jpg', alt: 'Colourful wooden boats on Phewa Lake in Pokhara, Nepal', description: 'Let the lake set the pace. Drift past the lakeshore, find a quiet café and watch the hills change colour as the day slips away.', rhythm: 'Lakeside days & gentle adventure', highlights: ['Time on Phewa Lake', 'Lakeside cafés', 'Walks in the surrounding hills'], category: 'Lakes & valleys' },
  { id: 'bhaktapur', name: 'Bhaktapur', eyebrow: 'STORIES IN EVERY STONE', image: '/images/bhaktapur.jpg', alt: 'Nyatapola Temple and the historic square in Bhaktapur, Nepal', description: 'Follow the sound of a pottery wheel into a courtyard. Look up at carved windows. Discover a city whose everyday life is as compelling as its extraordinary architecture.', rhythm: 'Living heritage & local flavours', highlights: ['Historic squares', 'Traditional crafts', 'Newari food and neighbourhoods'], category: 'Culture' },
];

export const experiences = [
  { title: 'Take the scenic route.', kicker: '01 / WALK A LITTLE FURTHER', image: '/images/himalaya.jpg', alt: destinations[0].alt, text: 'Trade a packed schedule for a path worth following. Leave room for a tea stop, a conversation, and the view you didn’t see coming.', tag: 'For the curious wanderer', destination: 0 },
  { title: 'Let the day unfold.', kicker: '02 / FIND YOUR SLOW', image: '/images/pokhara.jpg', alt: destinations[1].alt, text: 'An unhurried morning by the water. A boat ride with nowhere to rush. Sometimes the best part of a journey is doing a little less.', tag: 'For the gentle explorer', destination: 1 },
  { title: 'Follow a local story.', kicker: '03 / LOOK A LITTLE CLOSER', image: '/images/bhaktapur.jpg', alt: destinations[2].alt, text: 'Beyond the famous squares are workshops, family kitchens and lived-in courtyards. Meet a place through the details that make it home.', tag: 'For the culture seeker', destination: 2 },
];
