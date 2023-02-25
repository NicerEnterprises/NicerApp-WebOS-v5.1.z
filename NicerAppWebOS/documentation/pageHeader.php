<?php
    global $naWebOS;
    require_once ($naWebOS->basePath.'/NicerAppWebOS/domainConfigs/'.$naWebOS->domain.'/mainmenu.items.php');
    global $naURLs; // from .../NicerAppWebOS/domainConfigs/nicer.app/mainmenu.items.php
    global $na_apps_structure;
    if (false) {
    echo '<pre style="color:blue;">';
    var_dump ($na_apps_structure);
    echo '</pre><pre style="color:purple">';
    var_dump ($naURLs);
    echo '</pre>'; exit();
    }
?>
    <div class="container" style="display:flex;justify-content:left;align-items:center;">
        <div id="divFor_saCompanyLogo" style="margin-left:5px;margin-bottom:20px;width:125px;height:125px;border-radius:10px;border:solid rgba(0,0,0,0.8);padding:5px;box-shadow:0px 0px 2px 1px rgba(0,0,0,0.55);">
            <canvas id="saCompanyLogo" width="125" height="125" onclick="event.data={element:'saCompanyLogo'}; na.logo.settings.stage.removeAllChildren(); na.logo.init_do_createLogo('saCompanyLogo','countryOfOriginColors');"></canvas>
        </div>
        <div>
            <h1 class="contentSectionTitle1"><span class="contentSectionTitle1_span">NicerApp WebOS</span></h1>
        </div>
    </div>

    <div class="linkContainer">
        <a href="<?php echo $naURLs['docs__overview'];?>" class="contentSectionTitle3_a"><h3 class="contentSectionTitle3"><span class="contentSectionTitle3_span">Documentation</span></h3></a>
        <a href="<?php echo $naURLs['docs__license'];?>" class="contentSectionTitle3_a"><h3 class="contentSectionTitle3"><span class="contentSectionTitle3_span">License</span></h3></a>
        <a href="<?php echo $naURLs['docs__todoList'];?>" class="contentSectionTitle3_a"><h3 class="contentSectionTitle3"><span class="contentSectionTitle3_span">To-Do List</span></h3></a>
        <a href="<?php echo $naURLs['docs__companyOverview'];?>" class="contentSectionTitle3_a"><h3 class="contentSectionTitle3"><span class="contentSectionTitle3_span">Company Overview</span></h3></a>
    </div>
