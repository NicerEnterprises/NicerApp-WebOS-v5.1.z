<?php
    global $naWebOS;
    require_once ($naWebOS->basePath.'/NicerAppWebOS/documentation/pageHeader.php');
?>

<h1 class="contentSectionTitle2">NicerApp WebOS Development Direction</h1><br/><br/>
<ol class="todoList">
    <li class="todoList"><div>(DONE) (2021-2022) Create a Theme Editor.</div></li>

    <li class="todoList"><div>(DONE) (2022) Automatic site background rotations via #btnOptions dialog's first 'setting'.</div></li>

    <li class="todoList"><div>(DONE) (2022) Better error display features (list full error details in seperate dialog on the site itself).</div></li>

    <li class="todoList"><div>(DONE) (2022-Sept) Allow Guest users to use the Theme Editor (by storing theme settings per IP address + User-Agent in the database's existing theme_settings table).</div></li>

    <li class="todoList"><div>(DONE) (2022-Sept) Restore the old links, like the 3D WebGL (component) demos.</div></li>

    <li class="todoList"><div>(DONE) (2022-Sept) Improve the database access diversity.</div></li>

    <li class="todoList releaseDate"><div>(DONE) (2022 Nov 7th) : the emerging of <a href="https://said.by" class="noPushState noVividText" target="saidDotBy" style="margin:0 !important;">https://said.by</a> as an online blogging platform for end-users</a>.</li>

    <li class="todoList releaseDate"><div>(DONE) (2023 Feb 28th) Release <a href="https://github.com/NicerEnterprises/NicerApp-WebOS" class="noPushState" target="ghNA">version 5.1.3</a> : Fixes for the remaining CMS bugs, the page switching bugs and any other bugs.
    </div></li>

    <li class="todoList"><div>(2023) Write a users and groups editor dialog</div></li>

    <li class="todoList"><div>(2023) Upgrade the theme editor to allow users to specify which theme a new end-user should initially see for a page managed by them on a NicerApp domain</div></li>

    <li class="todoList"><div>(2023-2024) The rest of the items below here will be created in a seperate copy of the code, as version 5.2.0, that will run on my localhost server, shielded from the public internet, before getting copied into the live servers at https://nicer.app and https://said.by.
        <ol class="todoList_l1">
            <li class="todoList_l1"><div>Rewrite the page loading
            </div></li>

            <li class="todoList_l1"><div>Establish a proper permissions system and build a proper user interface in 2D &amp; 3D; a 'dataSubSetsExplorer' group of components.
            </div></li>

            <li class="todoList_l1"><div>(2023) Upgrade the na.desktop component to it's next major version (a complete rewrite, but one that enhances the old feature set by a significant degree.<br/>This version will allow for dialogs to be repositioned and resized by drag and drop.</div></li>

            <li class="todoList_l1"><div>Rework (nearly) all of the basic user-interface components of NicerApp WebOS
            </div></li>


            <li class="todoList_l1"><div>Transform the Theme Editor into a Universal Web Theme Editor.<br/>
            Tie specific HTML classes -that you can edit without technical knowledge using the UWTE- to specific HTML IDs.
            </div></li>

            <li class="todoList_l1"><div>Start work on a custom HTML WYSIWYG rich-text editor component of my own, that ties into the UWTE.<br/>
                <ol class="todoList_l2">
                    <li class="todoList_l2"><div>supply data from a HTML+CSS form into <a href="https://github.com/NicerEnterprises/NicerApp-WebOS-dev/blob/main/NicerAppWebOS/logic.business/class.core.WebsiteOperatingSystem-5.y.z.php#L1088" class="noPushState" target="naGH_wos1088">css_keyframes_to_array() and css_animation_template_to_animation()</a>.</div></li>
                </ol>
            </li>



            <li class="todoList_l1"><div>Show a small error window for a short time when a page can't load.</div></li>
        </ol>
    </div></li>

    <li class="todoList"><div>Restore the automatic retrieval of new backgrounds download routines for nicerapp via free to use methods of delivery at Google image search and (TODO :)Bing image search.</div></li>

    <li class="todoList"><div>Upgrade the news app and vividDialog : add siteToolbarLeft functionality :<br/>
        <ol class="todoList_l1">
            <li><div>add/enable/disable/remove any URL to a combination of lists that are each given a name, which get stored in several database-stored dataSubSets (records/documents) inside a dataSet (table/couchdb-database).<br/>
            </li>
            <li><div>the ability to assign specific 'theme' and 'sub-theme' settings to such a URL.</div></li>
            <li><div>the ability to do keyphrase searches (perhaps later with 'or' and 'and' logic support) on the news content gatered, and paint that content with specific 'theme' and/or 'sub-theme' settings.<br/>
            (putting all of this in siteToolbarLeft and the rest in the siteThemeEditor, and that those can already be shown at the same time, means you can edit *all* user-interface settings for *any* app or service on any HD screen or pad screen.</div></li>
            <li><div>let vividDialog have a vividMenu, with vividButton icons that will lead to vividMenus and vividDialogs and vividDialogPopups, at the top-right of it's borders.<br/>
            the contents of this menu should be defined in a &lt;UL&gt; structure (that can, if needed, get loaded with fresh content via AJAX), much like the vividMenu already is today.</div></li>
        </ol>
    </div>
    </li>

    <li class="todoList"><div>Full server backup facilities within NicerApp WebOS. Currently this is only needed for couchdb data and IMAP Maildir data), to other servers on the LAN or even outside the LAN of the web server, <b>and</b> to zip files (by using the php7.4-zip ubuntu OS library), <b>with</b> progress bar for the zip file creation processes, and also with restore functionality built right into the browser.</div></li>


    <li class="todoList"><div>Figure out a way to store the width and height of each background found in the filesystem in the output of .../NicerAppWebOS/domainConfigs/DOMAIN.TLD/ajax_backgrounds_recursive.php and .../NicerAppWebOS/domainConfigs/DOMAIN.TLD/ajax_backgrounds.php.<br/>
    (NOT DONE) Then use this information in the backgrounds menu to select only elligible backgrounds, and popup an error message 'No backgrounds found, reverting to search key = {$someSearchKey}' when no backgrounds are found for the current search / menu-option.</div></li>

    <li class="todoList"><div>Build a view port into <a href="https://wikipedia.org" target="wikipedia">https://wikipedia.org</a> data, whose content one may re-use without legal consequences, and which is *great*. :D</li>

    <li class="todoList"><div>Facebook-like timeline features with it's own look, feel and artwork.</div></li>

    <li class="todoList"><div>Integration of payment platforms (as plugins) for paypal.com, creditcards, and the Dutch banking system iDeal.</div></li>

    <li class="todoList"><div>Webshop functionality</div></li>

    <li class="todoList"><div>Basic Google Drive like facilities (to facilitate large attachments in email).</div></li>

    <li class="todoList"><div>Forums features.</div></li>

    <li class="todoList"><div>Integration of oAuth (Google and Facebook authentication systems).</div></li>

    <li class="todoList"><div>Webshop features.</div></li>

    <li class="todoList"><div>Small business administration features.</div></li>

    <li class="todoList"><div>Webmail features that can hopefully work with another IMAP data provider like Gmail and Hotmail as the primary email (backup) provider, IF Gmail and/or Hotmail still allow this.</div></li>

    <li class="todoList"><div>Music production app via linux commandline app sonic-pi, integration of that app with payment modules and musicPlayer.</div></li>
</ol>
