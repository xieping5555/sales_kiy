const webpack = require('webpack');
const path = require('path');


module.exports = {
	entry: path.resolve(__dirname,'src/main.js'),

	output: {
		path: path.resolve(__dirname,'dist'),
		filename: 'bundle.js',
        publicPath: "/dist/"
    },

	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options:{
					presets:['es2015']
				} 
			},{
				test: /\.css$/,
				loader: 'style-loader!css-loader'
			}
		]
	},

	devtool:'#evel-source-map',

	devServer: {
		contentBase: path.resolve(__dirname,'src'),
		port: 8080,
		historyApiFallback: true,
		inline: true,
		hot: true
	},

	plugins:[
		//热更新模块需要的配置
		new webpack.HotModuleReplacementPlugin()
	]
};

