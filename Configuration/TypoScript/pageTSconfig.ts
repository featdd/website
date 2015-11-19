TCEFORM {
	tt_content {
		# Rename headline layout labels
		header_layout.altLabels {
			1 = Hauptüberschrift (H1)
			2 = Unterüberschrift (H2)
			3 = Unterüberschrift (H3)
		}
		# Remove not used headline layout labels
		header_layout.removeItems = 0,4,5,6,7,8,9,10,100

		# Disable image orientation
		imageorient.disabled = 1

		# Disable image columns
		imagecols.disabled = 1

		# Disable image norows
		image_noRows.disabled = 1

		# Disable image border
		imageborder.disabled = 1

		# Disable image width
		imagewidth.disabled = 1

		# Disable image height
		imageheight.disabled = 1

		# Disable image link
		image_link.disabled = 1

		# Enable image zoom
		image_zoom = 1

		# Disable image compression
		image_compression.disabled = 1

		# Disable image effects
		image_effects.disabled = 1

		# Disable image frames
		image_frames.disabled = 1

		# Disable image caption position
		imagecaption_position.disabled = 1

		# Disable layout selection
		layout.disabled = 1

		# Disable space before
		spaceBefore.disabled = 1

		# Disable space after
		spaceAfter.disabled = 1

		# Disable frame
		section_frame.disabled = 1

		# Table background color
		table_bgColor.disabled = 1

		# Table border
		table_border.disabled = 1

		# Table cell spacing
		table_cellspacing.disabled = 1

		# Table cell padding
		table_cellpadding.disabled = 1

		# File size
		filelink_size.disabled = 1

		# Upload description
		uploads_description.disabled = 1

		# Upload type
		uploads_type.disabled = 1

		# Disable description
		rowDescription.disabled = 1

		# Disable header link
		header_link.disabled = 1

		# Disable header position
		header_position.disabled = 1
	}

	pages {
		cache_timeout.disabled = 1
		cache_tags.disabled = 1
		url_scheme.disabled = 1
		fe_login_mode.disabled = 1
		tx_realurl_pathsegment.disabled = 1
		tx_realurl_exclude.disabled = 1

		layout {
			altLabels.0 = LLL:EXT:website/Resources/Private/Language/locallang.xlf:layout.sidebar_left
			altLabels.1 = LLL:EXT:website/Resources/Private/Language/locallang.xlf:layout.sidebar_right
			removeItems = 2,3
		}
	}
}

RTE {
	default {
		contentCSS = EXT:website/Resources/Public/css/rte.css
		showButtons (
		blockstylelabel, blockstyle, textstylelabel, textstyle, linebreak,
		formatblock, bar, bold, italic, bar, orderedlist, unorderedlist,
		indent, bar, link, unlink, removeformat, linebreak,
		table, toggleborders, tableproperties, rowproperties, rowinsertabove,
		rowinsertunder, rowdelete, rowsplit, columninsertbefore, columninsertafter,
		columndelete, columnsplit, cellproperties, cellinsertbefore, cellinsertafter,
		celldelete, cellsplit, cellmerge, image, insertcharacter, chMode
		)
		keepButtonGroupTogether = 1
		proc.allowedClasses = download,pdf
		buttons.formatblock.removeItems = h1,h4,h5,h6,section,div,footer,header,nav,aside,blockquote,pre,address,article
		buttons.link.properties.class.allowedClasses = more,back,download,pdf
	}

	classes {
		download.name = Download
		pdf.name = PDF-Dokument
	}
}

mod {
	SHARED {
		defaultLanguageFlag = de
		defaultLanguageLabel = Deutsch
	}

	web_layout.BackendLayouts {
		default {
			title = Default
			config {
				backend_layout {
					colCount = 3
					rowCount = 1
					rows {
						1 {
							columns {
								1 {
									name = LLL:EXT:website/Resources/Private/Language/locallang.xlf:backendlayout.sidebar
									colspan = 1
									colPos = 0
								}
								2 {
									name = LLL:EXT:website/Resources/Private/Language/locallang.xlf:backendlayout.content
									colspan = 2
									colPos = 1
								}
							}
						}
					}
				}
			}
			icon = EXT:website/Resources/Public/icons/BackendLayout_Default.png
		}
	}
}
