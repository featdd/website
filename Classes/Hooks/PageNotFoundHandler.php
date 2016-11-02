<?php
namespace Featdd\Website\Hook;

/***************************************************************
 *
 *  Copyright notice
 *
 *  (c) 2016 Daniel Dorndorf <dorndorf@featdd.de>
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

use Featdd\Website\Utility\TypoScriptFrontendUtility;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Core\Utility\HttpUtility;
use TYPO3\CMS\Extbase\Configuration\ConfigurationManager;
use TYPO3\CMS\Extbase\Mvc\Web\Routing\UriBuilder;
use TYPO3\CMS\Extbase\Object\ObjectManager;
use TYPO3\CMS\Frontend\ContentObject\ContentObjectRenderer;
use TYPO3\CMS\Frontend\Controller\TypoScriptFrontendController;
use TYPO3\CMS\Frontend\Page\PageRepository;

/**
 * @package website
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class PageNotFoundHandler
{
    /**
     * @var UriBuilder
     */
    protected $uriBuilder;

    /**
     * @var array
     */
    protected $settings;

    /**
     * @return PageNotFoundHandler
     */
    public function __construct()
    {
        /** @var ObjectManager $objectManager */
        $objectManager = GeneralUtility::makeInstance(ObjectManager::class);
        /** @var ConfigurationManager $configurationManager */
        $configurationManager = $objectManager->get(ConfigurationManager::class);
        $this->pageRepository = $objectManager->get(PageRepository::class);

        TypoScriptFrontendUtility::initialize();

        $configurationManager->setContentObject(
            $objectManager->get(ContentObjectRenderer::class)
        );

        $this->uriBuilder = $objectManager->get(UriBuilder::class);
        $this->uriBuilder->injectConfigurationManager($configurationManager);

        $this->settings = $configurationManager->getConfiguration(ConfigurationManager::CONFIGURATION_TYPE_SETTINGS, 'website');
    }

    /**
     * @param array                        $params
     * @param TypoScriptFrontendController $typoScriptFrontendController
     *
     * @return string
     */
    public function handle(array &$params, TypoScriptFrontendController $typoScriptFrontendController)
    {
        if ($this->isUnauthorized($params['pageAccessFailureReasons'])) {
            $this->handleUnauthorizedAccess();
        } else {
            $this->handleNotFound();
        }
    }

    /**
     * @param array $accessReason
     * @return bool
     */
    protected function isUnauthorized(array $accessReason)
    {
        return $accessReason['fe_group'] != array('' => 0);
    }


    /**
     * 401 handling
     *
     * @return void
     */
    protected function handleUnauthorizedAccess()
    {
        HttpUtility::redirect(
            $this->getPageUrl($this->settings['unauthorizedPageUid']),
            HttpUtility::HTTP_STATUS_401
        );
    }

    /**
     * 404 handling
     *
     * @return void
     */
    protected function handleNotFound()
    {
        HttpUtility::redirect(
            $this->getPageUrl($this->settings['notFoundPageUid']),
            HttpUtility::HTTP_STATUS_404
        );
    }

    /**
     * Gets the pageUrl
     *
     * @param integer $pageUid
     * @return string
     */
    protected function getPageUrl($pageUid)
    {
        return $this->uriBuilder
            ->reset()
            ->setTargetPageUid((int) $pageUid)
            ->setCreateAbsoluteUri(true)
            ->buildFrontendUri();
    }
}
