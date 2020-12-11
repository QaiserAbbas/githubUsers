import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Doughnut2d = ({chartData}) => {
  const chartConfigs = {
    type: 'doughnut3d',
    width: '100%',
    // height: '100%',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Stars Per Language",
        "theme": "candy",
        "decimals": "0",
        "doughnutRadius": "45%",
        "showPercentValues":"0"
      },
      "data": chartData
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Doughnut2d;

