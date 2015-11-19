<?php

$EM_CONF[$_EXTKEY] = array(
	'title' => 'Website',
	'description' => 'Contains all configuration, templates etc.',
	'category' => 'templates',
	'author' => 'Daniel Dorndorf',
	'author_email' => 'dorndorf@dreipunktnull.com',
	'state' => 'stable',
	'internal' => '',
	'uploadfolder' => '0',
	'createDirs' => '',
	'dividers2tabs' => TRUE,
	'clearCacheOnLoad' => 0,
	'version' => '1.0.0',
	'constraints' => array(
		'depends' => array(
			'typo3' => '7.6.0',
		),
		'conflicts' => array(),
		'suggests' => array(
			'realurl' => '1.10.0-0.0.0'
		)
	),
);
