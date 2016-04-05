//Biomart build
//Usage: node biomart-build.js --specie <> --assembly <> [--buildGenes ][--buildTranscripts][--buildExons][--BuildGenCode]

//Import dependencies
var commandLineArgs = require('command-line-args');
var fs = require('fs');

//Import build biomart
var Build = require('./biomart/build.js');

//Initialize the command line arguments options
var cli = commandLineArgs([
  { name: 'specie', type: String },
  { name: 'assembly', type: String },
  { name: 'source', type: String },
  { name: 'buildGenes', alias: 'g', type: Boolean },
  { name: 'buildTranscripts', alias: 't', type: Boolean },
  { name: 'buildExons', alias: 'e', type: Boolean },
  { name: 'buildGencode', type: Boolean }
]);

//Get the command line args
var opt = cli.parse();

//Check the specie
if(typeof opt.specie === 'undefined'){ return console.error('No specie provided...'); }

//Check the assembly
if(typeof opt.assembly === 'undefined'){ return console.error('No assembly provided...'); }

//Check the build transcripts
if(typeof opt.buildTranscripts === 'undefined'){ opt.BuildTranscripts = false; }

//Check the build exons
if(typeof opt.buildExons === 'undefined'){ opt.buildExons = false; }

//Check the build genecode
if(typeof opt.buildGencode === 'undefined'){ opt.buildGencode = false; }

//Build
Build(opt);
