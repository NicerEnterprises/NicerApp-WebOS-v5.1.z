<?php
    require_once (dirname(__FILE__).'/mainmenu.php');
    global $naWebOS;
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en" style="width:100%;height:100%;">
<head>
<!--
https://nicer.app and https://said.by are Copyrighted (c) 2002-2023 by Rene A.J.M. Veerman from The Netherlands.

LICENSE : see https://nicer.app/docs-license
-->

<!--<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />-->
<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
{$viewport}
<meta name="HandheldFriendly" content="true" />
{$cssLinks}
{$javascriptLinks}
{$pageSpecificCSS}

<script id="jsBasicGlobals" type="text/javascript">
na.site.globals = $.extend(na.site.globals, {
    referer : '<?php echo (array_key_exists('HTTP_REFERER',$_SERVER)?$_SERVER['HTTP_REFERER']:'');?>',
    myip : '<?php echo str_replace('.','_',(array_key_exists('X-Forwarded-For',apache_request_headers())?apache_request_headers()['X-Forwarded-For'] : $_SERVER['REMOTE_ADDR']))?>',
    domain : '{$domain}'
});
$(document).ready(function() {
    na.site.onload(event);
});
</script>


    <link rel="apple-touch-icon" sizes="180x180" href="/NicerAppWebOS/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/NicerAppWebOS/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/NicerAppWebOS/favicon/favicon-16x16.png">
    <link rel="manifest" href="/NicerAppWebOS/favicon/site.webmanifest">
    <link rel="mask-icon" href="/NicerAppWebOS/favicon/safari-pinned-tab.svg" color="#5bbad5">
    <link rel="shortcut icon" href="/NicerAppWebOS/favicon/favicon.ico">
    <?php echo '<link type="text/css" rel="StyleSheet" href="/NicerAppWebOS/logic.business/errors.css?c='.date('Ymd_His', filemtime(dirname(__FILE__).'/../../logic.business/errors.css')).'">'.PHP_EOL; ?>
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-config" content="/NicerAppWebOS/favicon/browserconfig.xml">
    <meta name="theme-color" content="#ffffff">
    <title>{$title}</title>
</head>
<body>
    <div class="lds-facebook"><!-- thanks for allowing CC0 license usage : https://loading.io/css/ --><div></div><div></div><div></div></div> 

    <!-- BEGIN https://nicer.app customer HTML -->
    {$customerHTML}
    <!-- END https://nicer.app customer HTML -->

    <div id="siteDateTime" class="vividDialog"><div class="vividDialogContent vividScrollpane"></div></div>
    
    <div id="siteContent" class="vividDialog" rounding-test-case="M0 0 L 100 0 L100 100 L 0 100 Z">
    <div class="vividDialogContent vividScrollpane" tabindex="1">
{$div_siteContent}    
    </div>
    </div>

    <div id="btnOptions" class="vividButton_icon_50x50_siteTop" tabindex="2" onmouseover="na.site.settings.timeout_btnOptionsMouseOver = setTimeout(function(evt){na.site.onmouseover_btnOptions(event); delete na.site.settings.timeout_btnOptionsMouseOver;},500,event);" onmouseout="if (na.site.settings.timeout_btnOptionsMouseOver) { clearTimeout(na.site.settings.timeout_btnOptionsMouseOver); delete na.site.settings.timeout_btnOptionsMouseOver;}">
        <div class="vividButton_icon_borderCSS_50x50"></div>
        <img class="vividButton_icon_imgBorder_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_outerBorder.png"/>
        <img class="vividButton_icon_imgTile_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton.png"/>
        <img class="vividButton_icon_imgButtonIconBG_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_iconBackground.png" onclick="na.site.onclick_btnOptions(event)"/>
        <img class="vividButton_icon_imgButtonIcon_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnOptions2.png"/>
    </div>

    <div id="btnLoginLogout" class="vividButton_icon_50x50_siteTop" tabindex="3" onclick="na.site.displayLogin(event)" onmouseover="$('#btnOptions_menu').fadeOut('fast');">
        <div class="vividButton_icon_borderCSS_50x50"></div>
        <img class="vividButton_icon_imgBorder_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_outerBorder.png"/>
        <img class="vividButton_icon_imgTile_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton.png"/>
        <img class="vividButton_icon_imgButtonIconBG_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_iconBackground.png"/>
        <img class="vividButton_icon_imgButtonIcon_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnLogin2.png"/>
    </div>
    
    <div id="btnChangeBackground" class="vividButton_icon_50x50_siteTop tooltip" tabindex="4" onclick="na.site.changeBackground(event)" title="Alt-b : Next random background.">
        <div class="vividButton_icon_borderCSS_50x50"></div>
        <img class="vividButton_icon_imgBorder_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_outerBorder.png"/>
        <img class="vividButton_icon_imgTile_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton.png"/>
        <img class="vividButton_icon_imgButtonIconBG_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnCssVividButton_iconBackground.png" onclick="na.site.changeBackground(event)"/>
        <img class="vividButton_icon_imgButtonIcon_50x50" srcPreload="/NicerAppWebOS/siteMedia/btnBackground.png"/>
    </div>
    
    

    <div id="siteMenu" class="vividMenu" controlledBy="na.desktop" tabindex="5" theme="{$theme}" avoid='{$siteMenu_avoid}'>
        <div id="siteMenu_vbChecker" class="vividButton vividButton_text vividMenu_item" theme="'+t.t+'" style="opacity:0.0001;position:absolute;">abc XYZ</div>
        <?php mainmenu_includeAllResolutionsAndSegments(); ?>
        <ul class="vividMenu_mainUL" style="display:none;"></ul>
    </div>

    <div id="btnOptions_menu" class="vividDialogPopup anchored vividScrollpane" style="display:none;" onmouseover="na.site.onmouseover_btnOptions(event);" onmouseout="na.site.onmouseout_btnOptions(event)">
        <?php       
            global $naWebOS;
            $fn = realpath(dirname(__FILE__).'/../../../').'/NicerAppWebOS/domainConfigs/'.$naWebOS->domain.'/btnOptions_menu__default.php';
            if (file_exists($fn)) echo require_return($fn);
        ?>
    </div>
    
    
    
    <div id="siteStatusbar" class="vividDialog"><div class="vividDialogContent vividScrollpane"></div></div>
    
    
    
    <div id="siteBackground"> 
        <div id="siteBackground_bg"></div>
        <div id="siteBackground_bg2"></div>
        <script id="siteBackground_iframe_js" type="text/javascript"></script>
        <iframe id="siteBackground_iframe"></iframe>
        <img class="bg_first" alt=""/>
        <img class="bg_last" alt=""/>
    </div>
    
    <div id="siteLoginLogout" class="vividDialog" style="display:none;z-index:2000;">
    <div class="vividDialogContent vividScrollpane">
    </div>
    </div>

    <div id="siteVideo" class="vividDialog" style="display:none;justify-content:center;align-items:center;text-align:center;">
        {$div_siteVideo}
    </div>

    <div id="siteVideoSearch" class="vividDialog" style="display:none;justify-content:center;align-items:center;text-align:center;">
        {$div_siteVideoSearch}
    </div>

    
    <div id="siteComments" class="vividDialog" style="display:none;justify-content:center;align-items:center;text-align:center;">
        {$div_siteComments}
    </div>
    
    <div id="siteToolbarTop" class="vdToolbar vividDialog">
    <div class="vividDialogContent vividScrollpane">
        {$div_siteToolbarTop}
    </div>
    </div>

    <div id="siteToolbarLeft" class="vdToolbar vividDialog">
    <div class="vividDialogContent vividScrollpane">
        {$div_siteToolbarLeft}
    </div>
    </div>
    
    <div id="siteToolbarRight" class="vdToolbar vividDialog">
    <div class="vividDialogContent vividScrollpane">
        {$div_siteToolbarRight}
    </div>
    </div>

    
    
    <div id="siteRegistration" class="vividDialogPopup vividScrollpane">
        <div id="siteRegistrationContainer">
            <form id="siteRegistrationForm" name="siteRegistrationForm" action="/register.php" method="POST">
                <label for="srf_loginName">Name</label>
                <input id="srf_loginName" name="srf_loginName" type="text"/><br/>
                
                <!--<label for="srf_email" class="tooltip" tooltipTheme="mainTooltipTheme" title="We'll be sending you a confirmation link to this address">E-mail</label>
                <input id="srf_email" name="srf_email" type="text" class="tooltip" tooltipTheme="mainTooltipTheme" title="We'll be sending you a confirmation link to this address"/><br/>-->
                <label for="srf_email">E-mail</label>
                <input id="srf_email" name="srf_email" type="text"/><br/>
                
                <label for="srf_pw1">Password</label>
                <input id="srf_pw1" name="srf_pw1" type="password" autocomplete="new-password"/><br/>
                
                <label for="srf_pw2">Repeat password</label>
                <input id="srf_pw2" name="srf_pw2" type="password" autocomplete="new-password"/><br/>
            </form>
            <p id="siteRegistrationError"></p>
            <br/>
            <button id="btnSrfSubmit" type="button" class="button" onclick="na.site.register();"><span>Register! <img srcPreload="/NicerAppWebOS/3rd-party/tinymce-4/plugins/naEmoticons/img/happy.gif"/></span></div>
        </div>
    </div>


    <div id="siteLogin" class="vividDialogPopup vividScrollpane" style="" onmouseenter="$(event.currentTarget).css({opacity:1});">
        <?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'position:absolute;right:5px;',

    'btnCloseLoginWindow', 'vividButton_icon_50x50 btnCloseWindow grouped', '_50x50', 'grouped',
    '',
    'if (!$(this).is(\'.disabled\')) { $(\'#siteLogin\').fadeOut(\'fast\').delay(20).animate({top:-750}); }',
    '',
    '',

    7, 'Close Window',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    null,//'btnCssVividButton.grey2a.png',
    'btnDelete2.png',

    '',
    '',

    null,
    null,
    null
);

        ?>

        <div id="siteLoginContainer" style="display:flex;">
            <form id="siteLoginForm" name="siteLoginForm" method="post" action="/login" autocomplete="on" onkeydown="if (event.keyCode==13) na.site.login()">
                <div style="order:1">
                <label for="username">Name</label>
                <input id="username" name="username" autocomplete="on" type="text" tabindex="1"><br/>
                </div>
                <div class="verticalSpacer">&nbsp;</div>

                <div style="order:2">
                <label for="password">Password</label>
                <input id="password" name="password" type="password" autocomplete="on" tabindex="2"><br/>
                </div>
                <div class="verticalSpacer">&nbsp;</div>

                <div style="order:3">
                <input type="checkbox" id="rememberme" name="rememberme" CHECKED style="width:auto" tabindex="3">
                <label for="rememberme">Remember me</label><br/>
                </div>
                <div class="verticalSpacer">&nbsp;</div>
                
                <div style="order:4">
                <input type="submit" value="Submit" style="opacity:0.0001">
                </div>
            </form>
            <div class="verticalSpacer">&nbsp;</div>

            <div id="siteLoginMsg" style=""></div>
            <div class="verticalSpacer">&nbsp;</div>

            <div class="explanationContainer" style="">
                <p style="font-size:200%">Create an account or login to be able to create your own theme settings for this site.</p>
            </div>
            <div class="verticalSpacer">&nbsp;</div>

            <div class="buttonHolder" style="   ">
                <button id="btnNewAccount" type="button" class="button" style="height:2.5em" onclick="na.site.newAccount();" tabindex="5"><span>New account</span></button>
                <button id="btnLogin" type="button" class="button" onclick="na.site.login();" style="height:2.5em;" tabindex="6"><span>Log in</span></button>
            </div>
            <div class="verticalSpacer">&nbsp;</div>

        </div>
    </div>
    <div id="siteLoginSuccessful" class="vividDialogPopup vividScrollpane">Login Successful! <img srcPreload="/NicerAppWebOS/3rd-party/tinymce-4/plugins/naEmoticons/img/happy.gif"/></div>
    <div id="siteLoginFailed" class="vividDialogPopup vividScrollpane">Login failed..</div>
    
    
    <?php $errWindowStyle = '';?>
    <div id="siteErrors" class="vividDialogPopup anchored" style="<?php echo $errWindowStyle;?>">
        <div id="siteErrors_msg">{$div_siteErrors}</div>
    </div>
    
    

    <div id="siteToolbarThemeEditor" class="vdToolbar vividDialog">
    <div class="vividDialogContent vividScrollpane" style="overflow:hidden;overflow-y:auto;">
        <div class="sds_dialogTitle">
<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'width:100%;margin:5px;align-items:center;',
    
    'btnViewResult', 
    'vividButton_icon_50x50 grouped btnDelete forum', '_50x50', 'grouped',
    '',
    'na.te.hide(event)',
    '',
    '',
    
    400, 'View result.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.grey2a.png',
    null,//'btnCssVividButton_iconBackground.png',
    'btnBack.png',
    
    '',
    
    'View result',
    'grouped btnHide themeEditor', 
    'font-weight:bold;font-size:1em;'
);
?>
        </div>
        <div class="flexBreak"></div>
        <div id="specificitySettings" class="themeEditorComponent_alwaysVisible" style="font-size:15px;flex-wrap:wrap;">
<?php
global $naLAN;
if (false && $naLAN) {
    global $naWebOS;
    echo $naWebOS->html_vividButton (
        4, 'justify-items:center;width:100%;margin-top:5px !important',

        'btnFullResetOfAllThemes2',
        'vividButton_icon_50x50 grouped btnDelete forum', '_50x50', 'grouped',
        '',
        'na.site.onclick_btnFullResetOfAllThemes(event)',
        '',
        '',

        401, 'Reset the website back to it\'s factory theme settings.',

        'btnCssVividButton_outerBorder.png',
        'btnCssVividButton.blue1b.png',
        null,//'btnCssVividButton_iconBackground.png',
        'btnTrashcan_red.png',

        '',

        'Reset the website back to it\'s factory theme settings',
        'grouped btnDelete themes',
        'margin-left:10px !important;margin-right:10px !important;'
    );
};
?>
            <div class="flexBreak"></div>

            <div style="order:0;display:flex;align-items:center;justify-content:center;">
                <label for="themeEditor_specificity_dialog" class="labelthemeEditor2" style="order:0">Dialog
                    <input type="radio" id="themeEditor_photoSpecificity_dialog" name="sdad" class="radioInput" value="dialog" checked="checked" onchange="na.te.onchange_applicationRange(event);" style="order:0"/>
                </label>
                <label for="themeEditor_specificity_allDialogs" class="labelthemeEditor2" style="order:4;white-space:nowrap;">All dialogs
                    <input type="radio" id="themeEditor_photoSpecificity_allDialogs" name="sdad" class="radioInput" value="allDialogs" onchange="na.te.onchange_applicationRange(event);" style="order:1"/>
                </label>
            </div>
                
                
            <div style="display:flex;width:100%;align-items:center;">
                <label for="specificity" class="specificityLabel" style="order:1;vertical-align:middle;font-weight:bold">Specificity</label>
                <select id="specificity" class="select themeEditor mainBar_forThemeEditor" onchange="na.te.specificitySelected(event)" style="order:1;"></select>
                
<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'order:1;margin-left:10px',
    
    'btnDeleteSpecificity', 
    'vividButton_icon_50x50 grouped btnDelete forum', '_50x50', 'grouped',
    '',
    'if (!$(this).is(\'.disabled\')) na.te.deleteSpecificity(event)',
    '',
    '',

    402, 'Delete all themes for this specificity.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    null,//'btnCssVividButton_iconBackground.png',
    'iconDelete.png',
    
    '',
    
    null,
    null, 
    null
);
?>
            </div>
            <div style="display:flex;width:100%;align-items:center;margin-top:5px;">
                <label id="labelTheme" for="themes" class="specificityLabel" style="order:2;font-weight:bold;">Theme</label>
                <select id="themes" class="select themeEditor mainBar_forThemeEditor" onchange="na.te.themeSelected(event)" style="order:2">
                    <option id="theme_default" name="theme_default" value="default">default</option>
                </select>

<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'order:2;margin-left:10px',
    
    'btnSetPermissionsForTheme', 'vividButton_icon_50x50 grouped btnDelete forum', '_50x50', 'grouped',
    '',
    'if (!$(this).is(\'.disabled\')) na.te.setPermissionsForTheme(event)',
    '',
    '',

    403, 'Create or delete theme, and set permissions for current theme.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.red1b.png',
    '1660_blk_19329_zoom.upperBodyOnly.256x256.png',
    
    '<img class="vividButton_icon_imgButtonIcon_50x50_sup1" srcPreload="/NicerAppWebOS/siteMedia/btnTrashcan2_white_lowres.png" style="position:absolute;left:calc(50px - 15px);width:15px;height:19px;z-index:2021;"/>'
    .'<img class="vividButton_icon_imgButtonIcon_50x50_sup2" srcPreload="/NicerAppWebOS/siteMedia/documentAdd_lowres.png" style="position:absolute;left:-5px;width:20px;height:20px;z-index:2021;"/>',
    
    null, 
    null, 
    null
);
?>
            </div>
            
            <div class="navbar" style="order:5;width:100%;display:flex;align-items:center;justify-content:center;">
<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'order:1',
    
    'btnSelectBorderSettings', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectBorderSettings(event)',
    '',
    '',

    422, 'Set border settings.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.grey2a.png',
    'btnSettingsBorder3.png',
    
    null,
    
    null, 
    null, 
    null
);
echo $naWebOS->html_vividButton (
    4, 'order:2',
    
    'btnSelectBoxShadowSettings', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectBoxShadowSettings(event)',
    '',
    '',

    423, 'Set border shadow.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.orange1c.png',
    null,
    
    null,
    
    null, 
    null, 
    null
);
?>
           <!-- </div>
            <div class="navbar" style="order:6;display:flex;align-items:center;justify-content:center;">-->
<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'order:3',
    
    'btnSelectBackgroundColor', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectBackground_color(event)',
    '',
    '',

    432, 'Set background color.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.yellow1a.png',
    'btnColorPicker.png',
    
    null,
    
    null, 
    null, 
    null
);
echo $naWebOS->html_vividButton (
    4, 'order:4',
    
    'btnSelectBackgroundFolder', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectBackground_folder(event)',
    '',
    '',

    433, 'Select background image folder.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.yellow1b.png',
    'fileTree_1b.png',
    
    null,
    
    null, 
    null, 
    null
);
echo $naWebOS->html_vividButton (
    4, 'order:5',
    
    'btnSelectBackgroundImage', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectBackground_image(event)',
    '',
    '',

    434, 'Set background image.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.yellow1a.png',
    'btnBackground.png',
    
    null,
    
    null, 
    null, 
    null
);
?>
            </div>
            <div class="navbar" style="order:7;display:flex;align-items:center;justify-content:center;">
<?php
global $naWebOS;
echo $naWebOS->html_vividButton (
    4, 'order:6',
    
    'btnSelectTextSettings', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectTextSettings(event)',
    '',
    '',

    432, 'Set text settings.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.yellow1a.png',
    'btnSettingsText.png',
    
    null,
    
    null, 
    null, 
    null
);
echo $naWebOS->html_vividButton (
    4, 'order:7',
    
    'btnSelectTextShadowSettings', 'vividButton_icon_50x50 sdsnav grouped', '_50x50', 'grouped',
    '',
    'na.te.selectTextShadowSettings(event)',
    '',
    '',

    433, 'Set text shadow.',

    'btnCssVividButton_outerBorder.png',
    'btnCssVividButton.png',
    'btnCssVividButton.yellow1a.png',
    'btnSettingsTextShadow.png',
    
    null,
    
    null, 
    null, 
    null
);
?>            
            </div>
            
        </div>
        <div id="borderSettings" class="themeEditorComponent" style="top:auto;">
            <div class="themeEditorComponent_containerDiv" style="order:1">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv" style="display:inline-block">
                    <label id="labelBorderType" for="borderType" class="borderSettings_label">Color</label>
                </div>
                <input id="borderColorpicker" class="themeEditor_colorPicker" style="position:absolute;"></input>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:2;height:2.5em;margin-top:8px;display:flex;align-items:center;justify-content:center;">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv" style="display:inline-block">
                    <label id="labelBorderType" for="borderType" class="borderSettings_label">Type</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                <select class="select" id="borderType" onchange="na.te.borderSettingsSelected()">
                    <option value="dotted">Dotted</option>
                    <option value="dashed">Dashed</option>
                    <option value="solid">Solid</option>
                    <option value="double">Double</option>
                    <option value="groove">3D Groove</option>
                    <option value="ridge" selected>3D Ridge</option>
                    <option value="inset">3D Inset</option>
                    <option value="outset">3D Outset</option>
                    <option value="none">None</option>
                    <option value="hidden">Hidden</option>
                </select>
                </div>
            </div>
            </div>

            <div class="themeEditorComponent_containerDiv" style="order:3">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv" style="display:inline-block">
                    <label id="labelBorderWidth" for="borderWidth" class="borderSettings_label">Width</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="borderWidth" type="range" min="0" max="20" value="3" class="sliderOpacityRangeBorderSettings" onchange="na.te.borderSettingsSelected();"/>
                </div>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:4">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv" style="display:inline-block">
                    <label id="labelBorderRadius" for="borderRadius" class="borderSettings_label">Radius</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="borderRadius" type="range" min="0" max="50" value="20" class="sliderOpacityRangeBorderSettings" onchange="na.te.borderSettingsSelected();"/>
                </div>
            </div>
            </div>
        </div>
        <div id="boxShadowSettings" class="themeEditorComponent" style="top:auto;">
            <div class="themeEditorComponent_containerDiv" style="order:1">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv" style="display:inline-block">
                    <label id="labelBoxShadow" class="borderSettings_label">Box shadows</label>
                </div>
                <div id="boxShadowControls" class="borderSettings_input" style="display:inline-block;">
                    <img srcPreload="/NicerAppWebOS/siteMedia/iconCreate.png" onclick="na.te.addBoxShadow()"/>
                    <img srcPreload="/NicerAppWebOS/siteMedia/iconDelete.png" onclick="na.te.deleteBoxShadow()"/>
                    <!--<div id="boxShadow_0" class="boxShadow" style="background:rgba(200,200,200,1);border:1px solid lime; box-shadow:2px 2px 2px 2px rgba(0,0,0,0.5); border-radius:10px; margin : 5px; padding : 5px;" onclick="na.te.boxSettingsSelected(event);">ABC XYZ</div>-->
                </div>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:2">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowInset" class="borderSettings_label" for="boxShadowInset">Inset</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowInset" type="checkbox" onchange="na.te.boxSettingsChanged();"/>
                </div>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:3">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowXoffset" class="borderSettings_label" for="boxShadowXoffset">Hor offset</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowXoffset" type="range" min="-10" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.boxSettingsChanged();"/>
                </div>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:4">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowYoffset" class="borderSettings_label" for="boxShadowYoffset">Ver offset</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowYoffset" type="range" min="-10" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.boxSettingsChanged();"/>
                </div>
            </div>
            </div>
                        
            <div class="themeEditorComponent_containerDiv" style="order:5">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowSpreadRadius" class="borderSettings_label" for="boxShadowSpreadRadius">Spread</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowSpreadRadius" type="range" min="0" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.boxSettingsChanged();"/>
                </div>
            </div>
            </div>
                        
            <div class="themeEditorComponent_containerDiv" style="order:7">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowBlurRadius" class="borderSettings_label" for="boxShadowBlurRadius">Blur</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowBlurRadius" type="range" min="0" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.boxSettingsChanged();"/>
                </div>
            </div>
            </div>
            
            <div class="themeEditorComponent_containerDiv" style="order:8">
            <div class="themeEditor_input_containerDiv">
                <div class="borderSettings_label_containerDiv">
                    <label id="labelBoxShadowColor" class="borderSettings_label" for="boxShadowColor">Color</label>
                </div>
                <div class="borderSettings_input_containerDiv">
                    <input id="boxShadowColorpicker" class="themeEditor_colorPicker" style="position:absolute;top:95px;"></input>
                </div>
            </div>
            </div>
        </div>
        <div id="themeEditor_backgroundColor" class="themeEditorComponent" style="text-align:center;">
            <input id="colorpicker" class="themeEditor_colorPicker" style="position:absolute;top:auto;"></input>
        </div>
        <div id="themeEditor_jsTree" class="themeEditorComponent" style="top:auto;display:none;"></div>
        <div id="themeEditor_photoAlbum_specs" class="themeEditorComponent" style="height:6.4em;flex-flow: wrap row;position:relative;top:auto;display:none;">
            <div class="themeEditor_input_containerDiv">
            <label id="label_themeEditor_photoOpacity" class="labelthemeEditor" for="themeEditor_photoOpacity">Opacity</label>
            <input id="themeEditor_photoOpacity" type="range" min="1" max="100" value="50" class="sliderOpacityRangethemeEditor" oninput="if (na.te.settings.current.selectedImage) na.te.imageSelected(na.te.settings.current.selectedImage);"/>
            </div>
            
            <div class="themeEditor_input_containerDiv">
            <label id="label_themeEditor_photoScaleX" class="labelthemeEditor" for="themeEditor_photoScaleX">Scale hor</label>
            <input id="themeEditor_photoScaleX" type="range" min="25" max="200" value="100" class="sliderOpacityRangethemeEditor" style="top:30px;" oninput="if (na.te.settings.current.selectedImage) na.te.imageSelected(na .te.settings.current.selectedImage);"/>
            </div>
            
            <div class="themeEditor_input_containerDiv">
            <label id="label_themeEditor_photoScaleY" class="labelthemeEditor" for="themeEditor_photoScaleY">Scale ver</label>
            <input id="themeEditor_photoScaleY" type="range" min="25" max="200" value="100" class="sliderOpacityRangethemeEditor" style="top:63px;" oninput="if (na.te.settings.current.selectedImage) na.te.imageSelected(na.te.settings.current.selectedImage);"/>
            </div>
            
            <!--
            <div class="flexColumns" style="display:inline-flex;top:65px">
                <label for="themeEditor_photoSpecificity_dialog" class="labelthemeEditor2">Dialog
                <input type="radio" id="themeEditor_photoSpecificity_dialog" name="psdp" class="radioInput" value="dialog" checked="checked"/>
                </label>
                
                <label for="themeEditor_photoSpecificity_page" class="labelthemeEditor2">Page
                <input type="radio" id="themeEditor_photoSpecificity_page" name="psdp" class="radioInput" value="dialog"/>
                </label>
            </div>
            -->
        </div>
        <iframe id="themeEditor_photoAlbum" class="themeEditorComponent" style="top:calc(230px + 4em);height:calc(100% - 220px - 4em);display:none;border:0px"></iframe>
        <div id="textSettings" class="themeEditorComponent" style="top:auto;display:none;">
            <div class="themeEditor_input_containerDiv">
            <div class="textSettings_label_containerDiv">
                <label id="labelTextColor" class="textColorpicker textSettings_label" for="fontFamily">Color</label>
            </div>
            <div class="textSettings_input_containerDiv">
                <input id="textColorpicker" class="themeEditor_colorPicker" style="position:absolute;top:95px;"></input>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textSettings_label_containerDiv">
                <label id="labelTextFontFamily" class="textSettings_label" for="textFontFamily">Font</label>
            </div>
            <div class="textSettings_input_containerDiv">
                <!--<select class="select" id="textFontFamily" onchange="na.te.textSettingsSelected_updateDialog()">
                    <option value="ABeeZee">ABeeZee</option>
                    <option value="Aclonica">Aclonica</option>
                    <option value="Acme">Acme</option>
                    <option value="Actor">Actor</option>
                    <option value="Advent Pro">Advent Pro</option>
                    <option value="Akronim">Akronim</option>
                    <option value="Alex Brush">Alex Brush</option>
                    <option value="Architects Daughter">Architects Daughter</option>
                    <option value="Archivo Black">Archivo Black</option>
                    <option value="Baloo">Baloo</option>
                    <option value="Bebas Neue">Bebas Neue</option>
                    <option value="Caveat">Caveat</option>
                    <option value="Chewy">Chewy</option>
                    <option value="Cookie">Cookie</option>
                    <option value="Cormorant">Cormorant</option>
                    <option value="Courgette">Courgette</option>
                    <option value="Covered By Your Grace">Covered By Your Grace</option>
                    <option value="Dancing Script">Dancing Script</option>
                    <option value="El Messiri">El Messiri</option>
                    <option value="Exo">Exo</option>
                    <option value="Exo 2">Exo 2</option>
                    <option value="Fjalla One">Fjalla One</option>
                    <option value="Galada">Galada</option>
                    <option value="Gloria Hallelujah">Gloria Hallelujah</option>
                    <option value="Great Vibes">Great Vibes</option>
                    <option value="Handlee">Handlee</option>
                    <option value="Indie Flower">Indie Flower</option>
                    <option value="Kalam">Kalam</option>
                    <option value="Kaushan Script">Kaushan Script</option>
                    <option value="Khula">Khula</option>
                    <option value="Knewave">Knewave</option>
                    <option value="Krona One">Krona One</option>
                    <option value="Lacquer">Lacquer</option>
                    <option value="Lato:300,300i,400,400i">Lato</option>
                    <option value="Lemonada">Lemonada</option>
                    <option value="Lusitana">Lusitana</option>
                    <option value="M PLUS 1p">M PLUS 1p</option>
                    <option value="Marck Script">Marck Script</option>
                    <option value="Merienda One">Merienda One</option>
                    <option value="Modak">Modak</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Montserrat Alternates">Montserrat Alternates</option>
                    <option value="Mr Dafoe">Mr Dafoe</option>
                    <option value="Mukta Malar">Mukta Malar</option>
                    <option value="Nanum Pen Script">Nanum Pen Script</option>
                    <option value="Noto Serif JP">Noto Serif JP</option>
                    <option value="Odibee Sans">Odibee Sans</option>
                    <option value="Oleo Script">Oleo Script</option>
                    <option value="Open Sans">Open Sans</option>
                    <option value="Orbitron">Orbitron</option>
                    <option value="Pacifico">Pacifico</option>
                    <option value="Parisienne">Parisienne</option>
                    <option value="Pathway Gothic One">Pathway Gothic One</option>
                    <option value="Permanent Marker">Permanent Marker</option>
                    <option value="Playball">Playball</option>
                    <option value="Pridi">Pridi</option>
                    <option value="PT Sans">PT Sans</option>
                    <option value="Quattrocento Sans">Quattrocento Sans</option>
                    <option value="Raleway">Raleway</option>
                    <option value="Rock Salt">Rock Salt</option>
                    <option value="Sacramento">Sacramento</option>
                    <option value="Saira Condensed">Saira Condensed</option>
                    <option value="Saira Extra Condensed">Saira Extra Condensed</option>
                    <option value="Saira Semi Condensed">Saira Semi Condensed</option>
                    <option value="Satisfy">Satisfy</option>
                    <option value="Shadows Into Light">Shadows Into Light</option>
                    <option value="Shadows Into Light Two">Shadows Into Light Two</option>
                    <option value="Sigmar One">Sigmar One</option>
                    <option value="Signika Negative">Signika Negative</option>
                    <option value="Slabo 27px">Slabo 27px</option>
                    <option value="Source Code Pro">Source Code Pro</option>
                    <option value="Special Elite">Special Elite</option>
                    <option value="Spectral">Spectral</option>
                    <option value="Spinnaker">Spinnaker</option>
                    <option value="Sriracha">Sriracha</option>
                    <option value="Unica One">Unica One</option>
                    <option value="Ubuntu">Ubuntu</option>
                    <option value="Work Sans">Work Sans</option>
                </select>
                -->
                <div id="textFontFamily_containerDiv" style="position:relative">
                <div id="textFontFamily" class="vividMenu" type="vertical" tabindex="5" theme="{$theme}" style="position:relative">
                    <ul class="vividMenu_mainUL" style="display:none;" itemsLevel1="1" menuStructure="vertical">
                        <li><a id="textFontFamily_label" href="javascript:na.te.textSettings_getFont(event)">Select Font</a>
                            <ul>
                                <li><a href="#">Bold</a>
                                    <ul>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Aclonica')" style="font-family:Aclonica">Aclonica</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Archivo Black')" style="font-family:Archivo Black">Archivo Black</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Baloo')" style="font-family:Baloo">Baloo</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Bebas Neue')" style="font-family:Bebas Neue">Bebas Neue</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Chewy')" style="font-family:Chewy">Chewy</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Galada')" style="font-family:Galada">Galada</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Krona One')" style="font-family:Krona One">Krona One</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Modak')" style="font-family:Modak">Modak</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Odibee Sans')" style="font-family:Odibee Sans">Odibee Sans</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Sigmar One')" style="font-family:Sigmar One">Sigmar One</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Handwritten</a>
                                    <ul>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Acme')" style="font-family:Acme">Acme</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Akronim')" style="font-family:Akronim">Akronim</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Alex Brush')" style="font-family:Alex Brush">Alex Brush</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Architects Daughter')" style="font-family:Architects ">Architects Daughter</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Caveat')" style="font-family:Caveat">Caveat</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Cookie')" style="font-family:Cookie">Cookie</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Courgette')" style="font-family:Courgette">Courgette</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Covered By Your Grace')" style="font-family:Covered By Your Grace">Covered By Your Grace</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Dancing Script')" style="font-family:Dancing Script">Dancing Script</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Great Vibes')" style="font-family:Great Vibes">Great Vibes</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Kalam')" style="font-family:Kalam">Kalam</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Kaushan Script')" style="font-family:Kaushan Script">Kaushan Script</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Lacquer')" style="font-family:Lacquer">Lacquer</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Lemonada')" style="font-family:Lemonada">Lemonada</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Marck Script')" style="font-family:Marck Script">Marck Script</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Merienda One')" style="font-family:Merienda One">Merienda One</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Mr Dafoe')" style="font-family:Mr Dafoe">Mr Dafoe</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Nanum Pen Script')" style="font-family:Nanum Pen Script">Nanum Pen Script</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Oleo Script')" style="font-family:Oleo Script">Oleo Script</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Parisienne')" style="font-family:Parisienne">Parisienne</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Permanent Marker')" style="font-family:Permanent Marker">Permanent Marker</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Playball')" style="font-family:Playball">Playball</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Rock Salt')" style="font-family:Rock Salt">Rock Salt</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Sacramento')" style="font-family:Sacramento">Sacramento</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Satisfy')" style="font-family:Satisfy">Satisfy</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Shadows Into Light')" style="font-family:Shadows Into Light">Shadows Into Light</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Shadows Into Light Two')" style="font-family:Shadows Into Light Two">Shadows Into Light Two</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Sriracha')" style="font-family:Sriracha">Sriracha</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Office</a>
                                    <ul>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'ABeeZee')" style="font-family:ABeeZee">ABeeZee</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Actor')" style="font-family:Actor">Actor</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Advent Pro')" style="font-family:Advent Pro">Advent Pro</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Exo')" style="font-family:Exo">Exo</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Exo 2')" style="font-family:Exo 2">Exo 2</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Khula')" style="font-family:Khula">Khula</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'M PLUS 1p')" style="font-family:M PLUS 1p">M PLUS 1p</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Montserrat Alternates')" style="font-family:Montserrat Alternates">Montserrat Alternates</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Orbitron')" style="font-family:Orbitron">Orbitron</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Pathway Gothic One')" style="font-family:Pathway Gothic One">Pathway Gothic One</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Saira Condensed')" style="font-family:Saira Condensed">Saira Condensed</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Saira Extra Condensed')" style="font-family:Saira Extra Condensed">Saira Extra Condensed</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Saira Semi Condensed')" style="font-family:Saira Semi Condensed">Saira Semi Condensed</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Signika Negative')" style="font-family:Signika Negative">Signika Negative</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Slabo 27px')" style="font-family:Slabo 27px">Slabo 27px</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Source Code Pro')" style="font-family:Source Code Pro">Source Code Pro</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Spinnaker')" style="font-family:Spinnaker">Spinnaker</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Unica One')" style="font-family:Unica One">Unica One</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Ubuntu')" style="font-family:Ubuntu">Ubuntu</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Newspaper</a>
                                    <ul>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Cormorant')" style="font-family:Cormorant">Cormorant</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'El Messiri')" style="font-family:El Messiri">El Messiri</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Knewave')" style="font-family:Knewave">Knewave</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Lusitana')" style="font-family:Lusitana">Lusitana</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Noto Serif JP')" style="font-family:Noto Serif JP">Noto Serif JP</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Pridi')" style="font-family:Pridi">Pridi</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Quattrocento Sans')" style="font-family:Quattrocento Sans">Quattrocento Sans</a></li>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Spectral')" style="font-family:Spectral">Spectral</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Movies</a>
                                    <ul>
                                        <li><a href="javascript:na.te.textSettings_changeFont(event, 'Special Elite')" style="font-family:Special Elite">Special Elite</a></li>
                                    </ul>
                                </li>

                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Fjalla One')" style="font-family:Fjalla One">Fjalla One</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Gloria Hallelujah')" style="font-family:Gloria Hallelujah">Gloria Hallelujah</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Handlee')" style="font-family:Handlee">Handlee</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Indie Flower')" style="font-family:Indie Flower">Indie Flower</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Lato:300,300i,400,400i')" style="font-family:Lato">Lato:300,300i,400,400i</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Montserrat')" style="font-family:Montserrat">Montserrat</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Mukta Malar')" style="font-family:Mukta Malar">Mukta Malar</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Open Sans')" style="font-family:Open Sans">Open Sans</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Pacifico')" style="font-family:Pacifico">Pacifico</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'PT Sans')" style="font-family:PT Sans">PT Sans</a></option>
                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Raleway')" style="font-family:Raleway">Raleway</a></option>

                                <li><a href="javascript:na.te.textSettings_changeFont(event, 'Work Sans')" style="font-family:Work Sans">Work Sans</a></option>
                            </ul>
                        </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textSettings_label_containerDiv">
                <label id="labelTextSize" class="textSettings_label" for="textSize">Size</label>
            </div>
            <div class="textSettings_input_containerDiv">
                <input id="textSize" type="range" min="5" max="40" value="12" class="sliderOpacityRangeBorderSettings" onchange="na.te.textSettingsSelected(event);"/>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textSettings_label_containerDiv">
                <label id="labelTextWeight" class="textSettings_label" for="textWeight">Boldness</label>
            </div>
            <div class="textSettings_input_containerDiv">
                <input id="textWeight" type="range" min="3" max="10" value="4" class="sliderOpacityRangeBorderSettings" onchange="na.te.textSettingsSelected(event);"/>
            </div>
            </div>

        </div>
        <div id="textShadowSettings" class="themeEditorComponent" style="top:auto;display:none;">
            <div class="themeEditor_input_containerDiv">
            <div class="textShadowSettings_label_containerDiv">
                <label id="labelTextShadow" class="textShadowSettings_label">Text shadow</label>
            </div>
            <div id="textShadowControls">
                <img srcPreload="/NicerAppWebOS/siteMedia/iconCreate.png" onclick="na.te.addTextShadow(event)"/>
                <img srcPreload="/NicerAppWebOS/siteMedia/iconDelete.png" onclick="na.te.deleteTextShadow(event)"/>
                <!--<div class="flexBreak"></div>
                <div id="textShadow_0" class="textShadow" style="background:navy;border:1px solid white; border-radius:10px; margin : 5px; padding : 5px;" onclick="na.te.selectTextShadow(event)">ABC XYZ</div>-->
            </div>
            </div>
            
            <div class="themeEditor_input_containerDiv">
            <div class="textShadowSettings_label_containerDiv">
                <label id="labelTextShadowColor" class="textShadowSettings_label" for="textShadowColor">Color</label>
            </div>
            <div class="textShadow_input_containerDiv">
                <input id="textShadowColorpicker" class="themeEditor_colorPicker" style="position:absolute;top:95px;"></input>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textShadowSettings_label_containerDiv">
                <label id="labelTextShadowXoffset" class="textShadowSettings_label" for="textShadowXoffset">Hor-offset</label>
            </div>
            <div class="textShadow_input_containerDiv">
                <input id="textShadowXoffset" type="range" min="-10" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.textSettingsSelected(event);"/>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textShadowSettings_label_containerDiv">
                <label id="labelTextShadowYoffset" class="textShadowSettings_label" for="textShadowYoffset">Ver-offset</label>
            </div>
            <div class="textShadow_input_containerDiv">
                <input id="textShadowYoffset" type="range" min="-10" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.textSettingsSelected(event);"/>
            </div>
            </div>

            <div class="themeEditor_input_containerDiv">
            <div class="textShadowSettings_label_containerDiv">
                <label id="labelTextShadowBlurRadius" class="textShadowSettings_label" for="textShadowBlurRadius">Blur</label>
            </div>
            <div class="textShadow_input_containerDiv">
                <input id="textShadowBlurRadius" type="range" min="0" max="10" value="2" class="sliderOpacityRangeBorderSettings" onchange="na.te.textSettingsSelected(event);"/>
            </div>
            </div>

        </div>
        <div id="themePermissions" class="themeEditorComponent" style="position:absolute;top:auto;display:none;">
            <div class="themeEditor_input_containerDiv">
            <div class="themePermissions_label_containerDiv">
                <label id="labelThemeControls" class="themePermissions_label" for="themePermissionsControls">Themes</label>
            </div>
            <div id="themePermissionsControls" class="themePermissions_input_containerDiv">
                <img srcPreload="/NicerAppWebOS/siteMedia/iconCreate.png" onclick="na.te.addTheme(event)"/>
                <img srcPreload="/NicerAppWebOS/siteMedia/iconDelete.png" onclick="na.te.deleteTheme(event)"/>
                <div class="flexBreak"></div>
                <input id="theme_0" class="themeItem onfocus" type="text" onclick="na.te.themeSelected(event)" onchange="na.te.themeNameChanged(0, 'theme_0')" value="default"/>
            </div>
            </div>
        </div>
    </div>
    </div>
    
    
    <!-- see fonts.google.com (thanks, Google!) -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans|ABeeZee|Aclonica|Acme|Actor|Advent+Pro|Akronim|Alex+Brush|Architects+Daughter|Archivo+Black|Baloo|Bebas+Neue|Caveat|Chewy|Cookie|Cormorant|Courgette|Covered+By+Your+Grace|Dancing+Script|El+Messiri|Exo|Exo+2|Galada|Gloria+Hallelujah|Great+Vibes|Handlee|Indie+Flower|Kalam|Kaushan+Script|Khula|Knewave|Krona+One|Lacquer|Lemonada|Lusitana|M+PLUS+1p|Marck+Script|Merienda+One|Modak|Montserrat|Montserrat+Alternates|Mr+Dafoe|Nanum+Pen+Script|Noto+Serif+JP|Odibee+Sans|Oleo+Script|Orbitron|PT+Sans|Parisienne|Pathway+Gothic+One|Permanent+Marker|Playball|Pridi|Quattrocento+Sans|Rock+Salt|Sacramento|Saira+Condensed|Saira+Extra+Condensed|Saira+Semi+Condensed|Satisfy|Shadows+Into+Light|Shadows+Into+Light+Two|Sigmar+One|Signika+Negative|Slabo+27px|Source+Code+Pro|Special+Elite|Spectral|Spinnaker|Sriracha|Unica+One|Acme|Lato:300,300i,400,400i|Montserrat|Mukta+Malar|Ubuntu|Indie+Flower|Raleway|Pacifico|Fjalla+One|Work+Sans|Gloria+Hallelujah&display=swap" rel="stylesheet" onload="$(document).ready(function(){setTimeout(function(){na.site.startTooltips(event);},100);});">
    <!--<link href="https://fonts.googleapis.com/css?family=Krona+One|Open+Sans|Architects+Daughter&display=swap" rel="stylesheet" onload="$(document).ready(function(){na.site.settingstartTooltips(event);});">-->

</body>
</html>
