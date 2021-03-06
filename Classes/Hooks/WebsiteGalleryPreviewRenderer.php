<?php
namespace Featdd\Website\Hooks;

/***************************************************************
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

use TYPO3\CMS\Backend\View\PageLayoutView;
use TYPO3\CMS\Backend\View\PageLayoutViewDrawItemHookInterface;

/**
 * Contains a preview rendering for the page module of CType="website_gallery"
 *
 * @package website
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class WebsiteGalleryPreviewRenderer implements PageLayoutViewDrawItemHookInterface {

	/**
	 * Preprocesses the preview rendering of a content element of type "website_gallery"
	 *
	 * @param PageLayoutView $parentObject  Calling parent object
	 * @param bool           $drawItem      Whether to draw the item using the default functionality
	 * @param string         $headerContent Header content
	 * @param string         $itemContent   Item content
	 * @param array          $row           Record row of tt_content
	 *
	 * @return void
	 */
	public function preProcess(PageLayoutView &$parentObject, &$drawItem, &$headerContent, &$itemContent, array &$row) {
		if ($row['CType'] === 'website_gallery') {
			if ($row['media']) {
				$itemContent .= $parentObject->linkEditContent(
					$parentObject->getThumbCodeUnlinked($row, 'tt_content', 'media'),
					$row
				);
			}

			$drawItem = FALSE;
		}
	}
}
