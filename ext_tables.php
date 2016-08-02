<?php
if (!defined('TYPO3_MODE')) {
	die('Access denied.');
}

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'website');

// Auto load fluid_styled_content typoscript
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScriptSetup('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:fluid_styled_content/Configuration/TypoScript/Static/setup.txt">');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScriptConstants('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:fluid_styled_content/Configuration/TypoScript/Static/constants.txt">');

// Auto load extension typoscript
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:website/Configuration/TypoScript/pageTSconfig.ts">');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScriptSetup('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:website/Configuration/TypoScript/setup.txt">');
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addTypoScriptConstants('<INCLUDE_TYPOSCRIPT: source="FILE:EXT:website/Configuration/TypoScript/constants.txt">');

// Adds the content element to the "Type" dropdown
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPlugin(
	array(
		'LLL:EXT:website/Resources/Private/Language/locallang.xlf:website_newcontentelement.gallery.title',
		'website_gallery',
		\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::extRelPath($_EXTKEY)
		. 'Resources/Public/icons/website_gallery.png'
	),
	'CType'
);

// Configure the default backend fields for the content element
$GLOBALS['TCA']['tt_content']['types']['website_gallery'] = array(
	'showitem' => '
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.general;general,
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.header;header,
		--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.media,
			media,
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:palette.imagelinks;imagelinks,
		--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.appearance,
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.frames;frames,
		--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.access,
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.visibility;visibility,
			--palette--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:palette.access;access,
		--div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xml:tabs.extended
	'
);

// Register for hook to show preview of tt_content element of CType="website_gallery" in page module
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['cms/layout/class.tx_cms_layout.php']['tt_content_drawItem']['website_gallery'] = \Featdd\Website\Hooks\WebsiteGalleryPreviewRenderer::class;
