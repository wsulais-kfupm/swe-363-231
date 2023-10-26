<script>
  import { LayerCake, Svg } from 'layercake';

  import Line from './Line.svelte';
  import Area from './Area.svelte';
  import AxisX from './AxisX.svelte';
  import AxisY from './AxisY.svelte';

  // This example loads csv data as json using @rollup/plugin-dsv
  // import data from './_data/points.csv';

	const data = [
		[1979,7.19],
		[1980,7.83],
		[1981,7.24],
		[1982,7.44],
		[1983,7.51],
		[1984,7.1],
		[1985,6.91],
		[1986,7.53],
		[1987,7.47],
		[1988,7.48],
		[1989,7.03],
		[1990,6.23],
		[1991,6.54],
		[1992,7.54],
		[1993,6.5],
		[1994,7.18],
		[1995,6.12],
		[1996,7.87],
		[1997,6.73],
		[1998,6.55],
		[1999,6.23],
		[2000,6.31],
		[2001,6.74],
		[2002,5.95],
		[2003,6.13],
		[2004,6.04],
		[2005,5.56],
		[2006,5.91],
		[2007,4.29],
		[2008,4.72],
		[2009,5.38],
		[2010,4.92],
		[2011,4.61],
		[2012,3.62],
		[2013,5.35],
		[2014,5.28],
		[2015,4.63],
		[2016,4.72],
];
  const xKey = 0;
  const yKey = 1;

</script>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 250px;
  }
</style>

<div class="chart-container">
  <LayerCake
    padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
    x={xKey}
    y={yKey}
    yNice={4}
    yDomain={[0, null]}
    data={data}
  >
    <Svg>
      <AxisX/>
      <AxisY
        ticks={4}
      />
      <Line/>
      <Area/>
    </Svg>
  </LayerCake>
</div>