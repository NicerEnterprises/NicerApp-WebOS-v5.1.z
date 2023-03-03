//delete na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'];
na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'] = na.blog = {
    //settings : { current : { mediaFolderView : 'view' } },
    settings : {
        current : { mediaFolderView : 'view' },
		loadedIn : {
			'#siteContent' : {
				settings : {
					initialized : false
				},
				saConfigUpdate : function (settings) {
					nicerapp.site.globals.desktop.configUpdate();
				},

				onload : function (settings) {
                    na.m.waitForCondition ('applications/content-management-systems/NicerAppWebOS/blogEditor start', na.m.HTMLidle, function () {
                        var
                        na1 = na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'], g = na1.globals, s = na1.settings, c = s.current, db = c.db,
                        loadedIn = s.loadedIn['#siteContent'];

                        s.settings_onload = settings;
                        settings.onHold = true; // signals a wait for na.site.loadTheme() has started
                        na.site.settings.current.app = 'applications/content-management-systems/NicerAppWebOS/blogEditor';

                        $('#siteContent > .vividDialogContent, #siteToolbarLeft > .vividDialogContent').css({opacity:1,display:'none'}).fadeIn('slow');

                        $('#siteContent__header').fadeIn('normal', function () {
                            $('#siteContent__header').css({display:'flex'});
                        });

                        /*na.m.waitForCondition('siteContent dialog reappearance', function () {
                            return (
                                $('#jsPageSpecific').length > 0
                                //&& $('#siteContent__content').length > 0
                                //&& na.m.settings.initialized.site
                            );
                            //return true;
                        }, function () {*/
                            na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].settings.loadedIn['#siteContent'].settings.initialized = true;
                            na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].settings.loadedIn['#siteContent'].settings.ready = true;
                            document.addEventListener ('keyup', na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].onkeyup);

                            na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].onload(settings);
                            //na.analytics.logMetaEvent ('applications/content-management-systems/NicerAppWebOS/blogEditor (version '+na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].about.version+' is starting.');

                            settings.onHold = false; // signals a wait for na.site.loadTheme() has ended
                            //});
                        //}, 30);
                    }, 30);
				},
                ondestroy : function (settings) {
                    var
                    na1 = na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'], g = na1.globals, s = na1.settings, c = s.current, db = c.db;

                    $('#siteContent .vividButton_icon_50x50').each(function(idx,el){
                        var elID = el.id;
                        $('#'+elID).remove();
                        delete na.site.settings.buttons['#'+elID];
                    });

                    clearInterval(na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].settings.countDownInterval);
                    clearTimeout (na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].settings.refreshTimer);
                    clearTimeout (c.adsTimer1);
                    clearTimeout (c.adsTimer2);
                    clearInterval(c.adsInterval1);
                    clearTimeout (c.timerDisplayNews_loop);
                    clearTimeout (c.timerLoadNews_read_loop);
                    clearTimeout (c.timerDisplayNewsItem);
                    clearTimeout (c.timerDisplayItem);
                    clearTimeout (c.timerAnimateItemIn);
                    clearTimeout (c.timerCheck);
                    clearInterval (c.newItemsInterval);
                    clearInterval (c.intervalMailLogCountdown);

                    document.removeEventListener ('keyup', na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].onkeyup);
                    $(na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].settings.loaderIcon).remove();
                },
				onresize : function (settings) {
					// TODO : what's settings.isManualResize ???
					//if ($('#appGame').css('display')=='none') $('#appGame').fadeIn('slow');

                    na.apps.loaded['applications/content-management-systems/NicerAppWebOS/blogEditor'].onresize(settings);

				}
			}
		}
    },
    
    onload : async function(settings) {
        var 
        fncn = 'na.blog.onload()',
        url1 = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_getTreeNodes.php',
        ac = {
            type : 'GET',
            url : url1,
            success : function (data, ts, xhr) {
                try {
                    var dat = JSON.parse(data);
                } catch (error) {
                    na.site.fail (fncn+' : AJAX decode error in data returned for url='+url1+', error='+error.message+', in data='+data, xhr);
                    return false;
                }
                    
                na.blog.settings.current.db = dat;
                $.jstree.defaults.core.error = function (a,b,c,d) {
                    //debugger;
                };
                if (typeof $('#jsTree').jstree == 'function')
                $('#jsTree').css({
                    height : $('#siteToolbarLeft .vividDialogContent').height() - $('#jsTree_navBar').height()
                });
                var x = $('#jsTree');
                if (!x.is('.jstree'))
                x.jstree({
                    core : {
                        data : dat,
                        check_callback : true
                    },
                    types : {
                        "naSystemFolder" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSystemFolder.png",
                            "valid_children" : []
                        },
                        "naUserRootFolder" : {
                            "max_depth" : 14,
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naUserRootFolder.png",
                            "valid_children" : ["naFolder", "naMediaAlbum", "naDocument"]
                        },
                        "naGroupRootFolder" : {
                            "max_depth" : 14,
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naGroupRootFolder.png",
                            "valid_children" : ["naFolder", "naMediaAlbum", "naDocument"]
                        },
                        "naFolder" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naFolder.png",
                            "valid_children" : ["naFolder", "naMediaFolder", "naDocument"]
                        },
                        "naDialog" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSettings.png",
                            "valid_children" : []
                        },
                        "naSettings" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naSettings.png",
                            "valid_children" : []
                        },
                        "naTheme" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naVividThemes.png",
                            "valid_children" : []
                        },
                        "naVividThemes" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naVividThemes.png",
                            "valid_children" : []
                        },
                        "naMediaFolder" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naMediaAlbum.png",
                            "valid_children" : [ "naMediaFolder" ]
                        },
                        "naDocument" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naDocument.png",
                            "valid_children" : []
                        },
                        "saApp" : {
                            "icon" : "/NicerAppWebOS/siteMedia/na.view.tree.naApp.png",
                            "valid_children" : []
                        }
                    },
                    plugins : [
                        "contextmenu", "dnd", "search", "state", "types", "wholerow"
                    ]
                }).on('ready.jstree', function (e, data) {

                }).on('open_node.jstree', function (e, data) {
                    na.blog.onchange_folderStatus_openOrClosed(e, data);
                    
                }).on('close_node.jstree', function (e, data) {
                    na.blog.onchange_folderStatus_openOrClosed(e, data);
                    
                }).on('rename_node.jstree', function (e, data) {
                    na.blog.onchange_rename_node(e, data);
                    
                }).on('changed.jstree', function (e, data) {
                    var
                    c = na.site.settings.current,
                    editorHeight =
                        $('#siteContent .vividDialogContent').height()
                        - $('#document_navBar').height(),
                    mce_bars_height = 0;
                    $('.mce-toolbar-grp, .mce-statusbar').each(function() {
                        mce_bars_height += $(this).height();
                    });

                    if (
                        na.blog.settings.current.selectedTreeNode
                        && na.blog.settings.current.selectedTreeNode.type=='naDocument'
                    ) na.blog.saveEditorContent(na.blog.settings.current.selectedTreeNode);

                    for (var i=0; i<data.selected.length; i++) {
                        var d = data.selected[i], rec = data.instance.get_node(d);
                        if (rec && rec.original) {
                            na.blog.treeButtonsEnableDisable (rec);
                            $('#documentTitle').val(rec.original.text);
                            $('#mediaFolderTitle').val(rec.original.text);

                            var
                            url1 = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_getSEOvalue.php',
                            ac = {
                                type : 'GET',
                                url : url1,
                                data : { dataID : rec.original.dataID },
                                success : function (data, ts, xhr) {
                                    $('#seo_value').val(data);
                                },
                                error : function (xhr, textStatus, errorThrown) {
                                    na.site.ajaxFail(fncn, url2, xhr, textStatus, errorThrown);
                                }
                            };
                            $.ajax(ac);

                            na.blog.settings.current.selectedTreeNode = rec;
                            if (rec.original.type=='naDocument') {
                                na.blog.loadEditorContent(rec);
                                $('#folder').css({display:'none'});
                                $('#upload').css({display:'none'});
                                $('#document').css({display:'block'});
                                        $('.mce-tinymce').css ({
                                            width : '98%',
                                            height : editorHeight - $('.mce-statusbar').height()
                                        });
                                        //alert (mce_bars_height);
                                        $('.mce-top-part, .mce-statusbar').css({
                                            background : 'rgba(0,0,50,0.4)'
                                        });
                                        $('#tinymce_ifr').css ({
                                            width : '100%',
                                            height : editorHeight - mce_bars_height,
                                            background : 'rgba(0,0,0,0.4)'
                                        });
                            } else if (rec.original.type=='naMediaFolder') {
                                $('#folder').css({display:'none'});
                                $('#upload').css({display:'block'});
                                $('#document').css({display:'none'});
                                var
                                path = na.blog.currentPath(rec),
                                path = path.replace(/ /g, '%20'),
                                src = (
                                    na.blog.settings.current.mediaFolderView == 'upload'
                                    //? '/NicerAppWebOS/3rd-party/plupload-2.3.6/examples/jquery/jquery_ui_widget.php?c='+na.m.changedDateTime_current()+/*'&smID='+siteManager.id+'&iid='+iid+'&dialogID='+did+* /'&basePath='+path
                                    ? '/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/jquery_ui_widget.2.3.7.php?basePath='+path
                                    : '/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/index.php?basePath='+path+'&photoAlbum_emptyFolderPage=/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/jquery_ui_widget.2.3.7.php'
                                ),
                                el = $('#jQueryFileUpload')[0];
                                el.onload = na.blog.onresize;
                                el.src = src;
                            } else {
                                $('#folder').css({display:'block'});
                                $('#upload').css({display:'none'});
                                $('#document').css({display:'none'});
                            }

                            if (c.divsInitializing)
                            for (var i=0; i < c.divsInitializing.length; i++) {
                                var d = c.divsInitializing[i];
                                if (d.divID=='siteContent') d.loaded = true;
                            }

                            if (settings && typeof settings.callback=='function') settings.callback();
                        }
                    };

                }).on('move_node.jstree', function (e, data) {

                    var
                    tree = $('#jsTree').jstree(true),
                    oldPath = na.blog.currentPath(tree.get_node(data.old_parent)),
                    newPath = na.blog.currentPath(tree.get_node(data.parent)),
                    url2 = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_moveNode.php',
                    ac = {
                        type : 'POST',
                        url : url2,
                        data : {
                            database : data.node.original.database,
                            oldParent : data.old_parent,
                            oldPath : oldPath,
                            newParent : data.parent,
                            newPath : newPath,
                            target : data.node.original.id
                        },
                        success : function (data, ts, xhr) {
                        },
                        error : function (xhr, textStatus, errorThrown) {
                            na.site.ajaxFail(fncn, url2, xhr, textStatus, errorThrown);
                        }                
                    };
                    debugger;
                    $.ajax(ac);

                });
                
                $('#siteToolbarLeft .lds-facebook').fadeOut('slow');
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url1, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
        na.desktop.settings.visibleDivs.push ('#siteToolbarLeft');
        $(window).resize(na.blog.onresize)
        na.desktop.resize();
    },
    
    currentPath : function (node) {
        var me = na.blog, s = me.settings, c = s.current;
        
        var
        path = [ ],
        n = node;
        while (n.parent!=='#') {
            path[path.length] = n.text;
            var n2 = n;
            for (var idx in c.db) {
                var st = c.db[idx];
                if (st.id && st.id == n.parent) {
                    n = st;
                    break;
                }
            }
            if (n2 === n) {
                console.log ('ERROR : na.tree.currentPath(iid, ) : n2===n');
                debugger;
                break;
            }
        };
        path[path.length] = n.text;
        path = path.reverse().join('/');
        return path;//.replace('Users/','');
        //return path; // only paths being used right now already include the username in that path (from the tree node under 'Users')
    },
    
    onresize : function(settings) {
        //alert ('onr');
        if (na.m.userDevice.isPhone) {
            na.blog.settings.activeDialog='#siteToolbarLeft';
            na.d.s.visibleDivs.remove('#siteContent');
        };

        na.m.waitForCondition ('na.blog.onresize : HTMLidle?', na.m.desktopIdle, function () {
            //alert ('onres1');
            //na.desktop.resize(function (t) {
                //if (!t) t = this;
                //if (t.id=='siteContent') {
                    $('#siteContent .vividDialogContent').css({overflow:''});
                    //alert ('onres');
                    na.m.waitForCondition('tree select node',
                        function () {
                            return (
                                na.m.desktopIdle()
                                &&  na.blog.settings.current.selectedTreeNode
                                && (
                                    na.blog.settings.current.selectedTreeNode.type == 'naDocument'
                                    || na.blog.settings.current.selectedTreeNode.type == 'naMediaFolder'
                                )
                                && typeof $('#tinymce_ifr')[0] == 'object'
                                && $('#tinymce_ifr').css('visibility')!=='hidden'
                                && $('#tinymce_ifr').css('display')!=='none'
                            )
                        },
                        function () {
                            switch (na.blog.settings.current.selectedTreeNode.type) {
                                case 'naDocument':
                                    let w = 0, d = $('#document').css('display');
                                    $('#document').css({display:'block'});
                                    $('.navbar_button', $('#document_navBar')[0]).each(function(idx,el){
                                        w += $(el).width();
                                    });
                                    w += $('#documentTitle_label').width() + 20;
                                    $('#documentTitle').css({
                                        width : jQuery('#siteContent .vividDialogContent').width() - w - 45
                                    });
                                    var editorHeight = $('#siteContent .vividDialogContent').height() - $('#document_navBar').height();
                                    $('#jsTree').css({ height : $('#siteToolbarLeft .vividDialogContent').height() - $('#jsTree_navBar').height() - 20 });
                                    var mce_bars_height = 0;
                                    //alert ($('#document_navBar').height());
                                    $('.mce-toolbar-grp, .mce-statusbar').each(function() { mce_bars_height += $(this).height(); });
                                    $('.mce-tinymce').css ({
                                        width : '98%',
                                        height : editorHeight - $('.mce-statusbar').height()
                                    });
                                    //alert (mce_bars_height);
                                    $('.mce-top-part, .mce-statusbar').css({
                                        background : 'rgba(0,0,50,0.4)'
                                    });
                                    $('#tinymce_ifr').css ({
                                        width : '100%',
                                        height : editorHeight - mce_bars_height,
                                        background : 'rgba(0,0,0,0.4)'
                                    });
                                    $('#document').css({display:d});
                                    break;

                                case 'naMediaFolder':
                                    var
                                    p = $('#siteContent .vividDialogContent'),
                                    nb = $('#mediaFolder_navBar');

                                    $('#siteContent .vividDialogContent').css({overflow:'hidden'});
                                    $('.jQueryFileUpload').css ({
                                        top : '0px',
                                        left : '0px',
                                        width : p.width(),
                                        height : p.height() - nb.height(),
                                        border : '0px solid rgba(0,0,0,0)'
                                    });
                                    break;

                            }
                        }, 100
                    );
                //}
           // });
        }, 100);

        if (
            typeof settings == 'object'
            && typeof settings.callback == 'function'
        ) settings.callback (settings);
    },
    
    refresh : function (callback) {
        $('#siteToolbarLeft .lds-facebook').fadeIn('slow');
        var 
        fncn = 'na.blog.refresh(callback)',
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_getTreeNodes.php',
        ac = {
            type : 'GET',
            url : url,
            success : function (data, ts, xhr) {
                let 
                dat = JSON.parse(data),
                jfu = $('.jQueryFileUpload')[0];
                
                na.blog.settings.current.db = dat;
                $('#jsTree').jstree(true).settings.core.data = dat;
                $('#jsTree').jstree(true).refresh();
                $('#siteToolbarLeft .lds-facebook').stop(true,true).fadeOut('slow');
                if (jfu) jfu.contentWindow.location.reload(true);
                setTimeout (function () {
                    if (typeof callback=='function') callback (dat);
                }, 500);
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    loadEditorContent : function (rec, callback) {
        var
        fncn = 'na.blog.loadEditorContent(rec, callback)',
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_loadDocument.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : rec.original.database.replace('tree','documents'),
                id : rec.original.id
            },
            success : function (data, ts, xhr) {
                na.m.waitForCondition ('tinymce ready',
                    function () {
                        return tinymce.ready
                    },
                    function () {
                        tinymce.get('tinymce').setContent(data);
                        if (typeof callback=='function') callback(rec);
                    },
                    100
                );
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    saveEditorContent : function (rec, callback) {
        var 
        fncn = 'na.blog.saveEditorContent(rec,callback)',
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_editDocument.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : rec.original.database.replace('tree','documents'),
                id : rec.original.id,
                dataID : rec.original.dataID,
                document : tinymce.get('tinymce').getContent(),
                seoValue : $('#seo_value').val()
            },
            success : function (data, ts, xhr) {
                try {
                    var dat = JSON.parse(data);
                } catch (error) {
                    console.log ('na.blog.saveEditorContent() : FAILED :', error);
                }
                for (var ct in dat) {
                    rec.original.dataID = dat[ct].dataID; // TODO : this prevents different dataIDs in different ct environments from being used. needs a fix, eventually. by changing the dataID field in ___cms_tree__ and ___cms_documents__ to a JSON array (ct => dataID).
                    break;
                }
                if (typeof callback=='function') callback(rec);
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        },
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        role = undefined,
        user = undefined;
        for (var i=0; i<sel.parents.length; i++) {
            var p = tree.get_node(sel.parents[i]);
            if (p.type == 'naUserRootFolder') user = p.text;
            if (p.type == 'naGroupRootFolder') role = p.text;
        }
        if (user) ac.data.user = user;
        if (role) ac.data.role = role;

        $.ajax(ac);
        
    },
    
    onchange_folderStatus_openOrClosed : function (event, data) {
        var 
        fncn = 'na.blog.onchange_folderStatus_openOrClosed(event,data)',
        tree = $('#jsTree').jstree(true),
        //sel = tree.get_node(tree.get_selected()[0]),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_changeNodeStatus_openOrClosed.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : data.node.original.database,
                id : data.node.id,
                open : data.node.state.opened ? 'true' : 'false'
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    onchange_rename_node : function (event, data) {
        var 
        fncn = 'na.blog.onchange_rename_node(event,data)',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_changeNode_rename_node.php',
        rec = na.blog.settings.current.selectedTreeNode,
        relFilePath = na.blog.currentPath(rec),
        oldFolderName = data.old,
        newFolderName = data.text,
        newRelFilePath = relFilePath.replace('/'+oldFolderName, '/'+newFolderName),
        ac = {
            type : 'POST',
            url : url,
            dbg : {
                data : data,
                relFilePath : relFilePath,
                oldFolderName : oldFolderName,
                newFolderName : newFolderName,
                newRelFilePath : newRelFilePath
            },
            data : {
                database : sel.original.database,
                id : data.node.id,
                node_title_new : data.text,
                node_title_old : data.old,
                oldPath : relFilePath.replace('/'+newFolderName,'')+'/'+data.old,
                newPath : newRelFilePath
            },
            success : function (data, ts, xhr) {
                debugger;
                na.blog.refresh(); // needs this to update the JS db!
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        debugger;
        $.ajax(ac);
    },
    onchange_mediaFolderTitle : function (event) {
        var 
        fncn = 'na.blog.onchange_mediaFolderTitle(event)',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        rec = na.blog.settings.current.selectedTreeNode,
        relFilePath = na.blog.currentPath(rec),
        oldFolderName = rec.original.text,
        newFolderName = $('#mediaFolderTitle').val(),
        newRelFilePath = relFilePath.replace('/'+oldFolderName, '/'+newFolderName),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_changeNode_mediaFolderTitle.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                id : sel.original.id,
                text : newFolderName,
                relFilePath : relFilePath,
                newRelFilePath : newRelFilePath
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    onchange_documentTitle : function () {
        var 
        fncn = 'na.blog.onchange_documentTitle()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_changeNode_documentTitle.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                id : sel.original.id,
                dataID : sel.original.dataID,
                text : $('#documentTitle').val(),
                seoValue : $('#seo_value').val()
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    onchange_seoValue : function () {
        var
        fncn = 'na.blog.onchange_documentTitle()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_changeNode_documentTitle.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                id : sel.original.id,
                dataID : sel.original.dataID,
                text : $('#documentTitle').val(),
                seoValue : $('#seo_value').val()
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }
        };
        $.ajax(ac);
    },

    onclick_addFolder : function() {
        var 
        fncn = 'na.blog.onclick_addFolder()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        rec = na.blog.settings.current.selectedTreeNode,
        relFilePath = na.blog.currentPath(rec),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_addNode.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                parent : sel.original.id,
                relFilePath : relFilePath,
                type : 'naFolder'
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    onclick_addDocument : function() {
        var 
        fncn = 'na.blog.onclick_addDocument()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_addNode.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                parent : sel.original.id,
                type : 'naDocument'
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    onclick_addMediaAlbum : function() {
        var 
        fncn = 'na.blog.onclick_addMediaAlbum()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        rec = na.blog.settings.current.selectedTreeNode,
        relFilePath = na.blog.currentPath(rec),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_addNode.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                parent : sel.original.id,
                type : 'naMediaFolder',
                relFilePath : relFilePath
            },
            success : function (data, ts, xhr) {
                var 
                me = na.blog, s = me.settings, c = s.current;
                try {
                    var dat = JSON.parse(data);
                } catch (error) {
                    na.site.fail (fncn+' : AJAX decode error in data returned for url='+url1+', error='+error.message+', in data='+data, xhr);
                    return false;
                }
                    
                na.blog.refresh(function(nodes) {
                    for (var i=0; i<c.db.length; i++) {
                        if (c.db[i].text === dat.recordAdded.text) {
                            $('#jsTree').jstree('deselect_all');
                            $('#jsTree').jstree('select_node', c.db[i].id);
                        }
                    }
                    na.blog.onclick_btnUpload();
                });
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    onclick_delete : function () {
        var 
        fncn = 'na.blog.onclick_delete()',
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        rec = na.blog.settings.current.selectedTreeNode,
        path = na.blog.currentPath(rec),
        url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_deleteNode.php',
        ac = {
            type : 'POST',
            url : url,
            data : {
                database : sel.original.database,
                id : sel.original.id,
                currPath : path
            },
            success : function (data, ts, xhr) {
                na.blog.refresh();
            },
            error : function (xhr, textStatus, errorThrown) {
                na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
            }                
        };
        $.ajax(ac);
    },
    
    onclick_publish : function () {
        var
        tree = $('#jsTree').jstree(true),
        sel = tree.get_node(tree.get_selected()[0]),
        role = undefined,
        user = undefined;
        
        for (var i=0; i<sel.parents.length; i++) {
            var p = tree.get_node(sel.parents[i]);
            if (p.type == 'naUserRootFolder') user = p.text;
            if (p.type == 'naGroupRootFolder') role = p.text;
        }
        var
        arr = {
            misc : {
                folder : '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS'
            },
            cmsText : {
                database : sel.original.database,
                id : sel.original.id
            }
        };
        if (user) arr.cmsText.user = user;
        if (role) arr.cmsText.role = role;
        
        //var url = '/'+user+'/in/'+sel.original.dataID;//na.m.base64_encode_url (JSON.stringify(arr));
        na.blog.saveEditorContent(sel, function(rec) {
            var
            url1 = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_getSEOvalue.php',
            ac = {
                type : 'GET',
                url : url1,
                data : { dataID : rec.original.dataID },
                success : function (data, ts, xhr) {
                    var url = '/'+user.replace(/ /g, '-')+'/in/'+data;
                    na.site.loadContent(null, url);
                },
                error : function (xhr, textStatus, errorThrown) {
                    var url = '/'+user.replace(/ /g, '-')+'/in/'+rec.original.dataID;
                    na.site.loadContent(null, url);
                }
            };
            $.ajax(ac);

        });
    },
    
    onclick_insertMedia : function () {
        var
        tmce = tinymce.get('tinymce');
        
        tmce.windowManager.open({
            title : 'Insert Photo Album',
            url : '/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/index.all.php',
            width : 570,
            height: 700
        });
    },
    
    insertMediaFolder : function (relPath) {
        tinymce.activeEditor.execCommand ('mceInsertContent', false, ':{"mediaFolder":"'+relPath+'"}:');
        tinymce.activeEditor.windowManager.close();
    },
    
    onclick_btnUpload : function (evt) {
        na.blog.settings.current.mediaFolderView = 'upload';
        na.blog.mediaFolder_viewChanged();
    },
    
    onclick_btnViewMedia : function (evt) {
        na.blog.settings.current.mediaFolderView = 'view';
        na.blog.mediaFolder_viewChanged();
    },
    
    onclick_mediaThumbnail : function (evt, basePath, filename) {
        var 
        arr = {
            cmsViewMedia : {
                basePath : basePath,
                filename : filename
            }
        },
        base64 = na.m.base64_encode_url(JSON.stringify(arr));
        debugger;
        na.site.loadContent(base64);
    },
    
    mediaFolder_viewChanged : function () {
        var
        rec = na.blog.settings.current.selectedTreeNode,
        path = na.blog.currentPath(rec),
        path = path.replace(/ /g, '%20'),
        src = (
            na.blog.settings.current.mediaFolderView == 'upload'
            //? '/NicerAppWebOS/3rd-party/plupload-2.3.6/examples/jquery/jquery_ui_widget.php?changed='+na.m.changedDateTime_current()+/*'&smID='+siteManager.id+'&iid='+iid+'&dialogID='+did+*/'&basePath='+path
            ? '/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/jquery_ui_widget.2.3.7.php?basePath='+path
            : '/NicerAppWebOS/logic.userInterface/photoAlbum/4.0.0/index.php?basePath='+path
        ),
        el = $('#jQueryFileUpload')[0];
        el.onload = na.blog.onresize;
        el.src = src;
    },
    
    treeButtonsEnableDisable : function(rec) {
        $('.jsTree_navBar_button').removeClass('disabled');
        if (rec && rec.original)
        switch (rec.original.type) {
            case 'naFolder':
                break;
            case 'naSystemFolder':
                $('#jsTree_addDocument').addClass('disabled');
                $('#jsTree_addFolder').addClass('disabled');
                $('#jsTree_addMediaAlbum').addClass('disabled');
                $('#jsTree_delete').addClass('disabled');
                break;
            case 'naUserRootFolder':
                break;
            case 'naGroupRootFolder':
                break;
            case 'naDocument':
                $('#jsTree_newDocument').addClass('disabled');
                break;
        }
    },
    
    tinymce_link_list : function (success) {
        var me = na.blog, s = me.settings, c = s.current, rel = jQuery(s.hid)[0];
        var x = c.db;
        var r = [
            /*
            { title : 'abc', menu : [
                { title : 'xyz' : value : 'url/to/page.html' }
            ]},
            { title : 'abd', menu : [] }
            */
        ];
//debugger;
        for (var i=0; i<c.db.length; i++) {
            var it = c.db[i];
            if (it.type=='naDocument') {
                // find the parents
                var 
                j = i,
                it2 = c.db[j],
                title = it2.title,
                parentsLabel = it2.text,
                parentsURL = it2.text; // or it2.title
                
                while (it2.parent!=='#') {
                    for (var k=0; k<c.db.length; k++) {
                        var it3 = c.db[k];
                        if (it3.id && it3.id===it2.parent) {
                            parentsLabel = it3.text + '/' + parentsLabel;
                            parentsURL = it3.text + '/' + parentsURL;
                            break;
                        }
                    }
                    
                    if (it3.parent==='#') {
                        var userOrGroupVal = it2.text;
                    }
                    it2 = it3;
                    if (it2.parent==='#') {
                        if (it2.text==='Users') var userOrGroup = 'user';
                        if (it2.text==='Groups') var userOrGroup = 'group';
                    }
                }
                
                var v = { // ---> the URL part of a final URL that lists as http://yoursite.com/apps/BASE64JSON-URL                    
                    cmsText : { // nicerapp app name
                        database : it.database,
                        id : it.id
                    }
                },
                tree = $('#jsTree').jstree(true),
                sel = tree.get_node(tree.get_selected()[0]),
                role = undefined,
                user = undefined;
                for (var j=0; j<sel.parents.length; j++) {
                    var p = tree.get_node(sel.parents[j]);
                    if (p.type == 'naUserRootFolder') user = p.text;
                    if (p.type == 'naGroupRootFolder') role = p.text;
                }
                var
                v = {
                    misc : {
                        folder : '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS'
                    },
                    cmsText : {
                        database : it.database,
                        id : it.id
                    }
                };
                if (user) v.cmsText.user = user;
                if (role) v.cmsText.role = role;
//debugger;
                var y = { 
                    title : parentsLabel, 
                    //value : '/apps/'+na.m.base64_encode_url( JSON.stringify(v) )
                    value : '/'+user+'/in/'+it.dataID
                };
                //debugger;
                r.push (y);
            }
        };

        //debugger;
        success(r);
    },
    
    currentNode_createPath : function (path) {
        var 
        fncn = 'na.blog.currentNode_createPath("'+path+'")',
        me = na.blog, s = me.settings, c = s.current,
        tree = $('#jsTree').jstree(true),
        sel = tree.get_selected()[0],
        node = tree.get_node(sel),
        
        types = {
            saFolder : 'tree_btnCreateFolder',
            naMediaAlbum : 'tree_btnCreateMediaAlbum',
            naDocument : 'tree_btnCreateDocument'
        }//,
        //proceed = parseFloat(jQuery('#'+types[type]).css('opacity')) === 1;
        
        var
        t = tree.get_json(node),
        cur = t,
        paths = path.split('/');
        
        //if (paths.length==2) debugger;
        
        for (var i=0; i<paths.length; i++) {
            var 
            folderName = paths[i],
            d = cur.children,
            found = false;
            for (var j=0; j<d.length; j++) {
                if (d[j].text===folderName) {
                    found = true;
                    cur = d[j];
                }
            }
            if (!found && folderName!=='thumbs') {
                var 
                n2 = tree.get_node(cur.id),
                n = {
                    database : n2.original.database,
                    id : na.m.randomString(),
                    type : 'naMediaFolder',
                    text : folderName,
                    title : folderName,
                    parent : cur.id,
                    state : { opened : true }
                },
                r = tree.create_node (cur.id, n),
                url = '/NicerAppWebOS/apps/NicerAppWebOS/content-management-systems/NicerAppWebOS/blogEditor/ajax_addNode.php',
                ac = {
                    type : 'POST',
                    url : url,
                    data : {
                        database : n2.original.database,
                        id : r,
                        parent : cur.id,
                        label : folderName,
                        type : 'naMediaFolder'
                    },
                    success : function (data, ts, xhr) {
                        //na.blog.refresh();
                    },
                    error : function (xhr, textStatus, errorThrown) {
                        na.site.ajaxFail(fncn, url, xhr, textStatus, errorThrown);
                    }                
                };
                $.ajax(ac);

                //debugger;
                c.db[c.db.length] = node;
                
                return me.currentNode_createPath (path);
            }
        }
        
        return true;
    },
    
    mediaUploadComplete : function (up, files) {
        na.blog.refresh(function(nodes) {
            var 
            me = na.blog, s = me.settings, c = s.current,
            id = files[0].relativePath.split('/')[1];
            
            for (var i=0; i<c.db.length; i++) {
                var it = c.db[i];
                if (it.text === id) {
                    $('#jsTree').jstree('deselect_all');
                    $('#jsTree').jstree('select_node', it.id);
                };
            };
            na.blog.onclick_btnViewMedia();
        });
    }
}
