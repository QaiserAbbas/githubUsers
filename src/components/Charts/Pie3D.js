import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

const Pie3D = ({chartData}) => {
  const chartConfigs = {
    type: 'pie3d',
    width: '100%',
    // height: '100%',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Languages",
        "subCaption": "Most Popular",
        "theme": "fusion",
        "decimals": "0",
        "pieRadius":"45%"
      },
      "data": chartData
    },
  };
  return <ReactFC {...chartConfigs} />;
}

export default Pie3D;
