class naVividMenu__behavior_rainbowPanels {
    constructor(el, callback7) {
        var t = this;
        na.site.settings.menus['#'+el.id] = this;
        t.el = el;
        t.theme = $(el).attr('theme');
        t.type = $(el).attr('type') === 'vertical' ? 'vertical' : 'horizontal';
        t.debugMe = true;
        t.useDelayedShowingAndHiding = true;
        t.useFading = true;
        t.fadingSpeed = 'slow';
        t.percentageFor_rainbowPanels =
            !na.site.settings.current.theme || na.site.settings.current.theme.menusUseRainbowPanels
            ? 100
            : 0;
        t.items = [];
        t.children = {};
        t.childPanels = {};
        t.shownChildren = {};
        t.shownMenuItems = {};
        t.timeout_showSubMenu = {};
        t.timeout_hideAll = {};
        t.timeout_hideSubMenu = {};
        t.panelsShown = {};

        //t.initWatchFunctions(t);
        t.initItems(t);


        $('.vividMenu_item', $('#menu__'+t.el.id)[0]).each(function(idx,itEl) {
            if (itEl.it && itEl.it.level===1) {
                if (t.el.id=='textFontFamily') debugger;
                var
                dim = t.getDimensions(t, itEl, false);

                $(itEl).css({display:'absolute'});
                t.showMenuItem (t, itEl.it, dim, { currentTarget : null });
                if (t.useFading)
                    $(itEl).stop(true,true).fadeIn(t.fadingSpeed);
                else
                    $(itEl).css({display:'block'});
            }
        });


        if (typeof callback7=='function') callback7(t.el);

        return this;
    }

    initWatchFunctions_circularReplacer(key,value) {
        if (key=='parentDiv' || key=='el') {
            return getCircularReplacer(key,value);
        } else {
            console.log (key, value);
            return getCircularReplacer(key,value);
        }
    }

    initWatchFunctions(t) {
        na.m.waitForCondition('report on major variables', function () {
            var
            t1 = $.extend({},t),
            dbg = {
                msg : 'naVividMenu.initWatchFunctions() : report on major variables',
                t : t1
            },
            dbgJSON = JSON.stringify(dbg, t.initWatchFunctions_circularReplacer);

            if (dbgJSON!==t.cache_dbg) {
                t.cache_dbg = dbgJSON;
                console.log (dbg);
            }

        }, function () {}, 3333);
    }

    initItems(t) {
        $('.vividMenu_item', t.el).not('#siteMenu_vbChecker').remove();
        var
        html = '',
        rootItems = 0,
        LIs = $('.vividMenu_mainUL', t.el).find('li');

        LIs.each(function(idx,li) {
            $(li).attr('id', t.el.id+'__li__'+idx);
            html += '<div id="'+t.el.id+'__'+idx+'" class="vividButton vividButton_text vividMenu_item backdropped"  theme="dark" style="display:none;">'+$(li).children('a')[0].outerHTML.replace($(li).children('a')[0].innerText+'</a>', '<span class="contentSectionTitle3_span">'+$(li).children('a')[0].innerText+'</span></a>').replace('class="linkToNewPage"', 'class="linkToNewPage contentSectionTitle3_a"')+'</div>';

            t.items[idx] = {
                idx : idx,
                label : $('a',li)[0].innerText,
                li : li,
                level : jQuery(li).parents('ul').length,
                path : ''
            };
            li.it = t.items[idx];
        });

        LIs.each(function(idx,li) {
            var
            it = t.items[idx],
            itp = null,
            p = jQuery(li).parents('ul > li'),
            psIt = [];

            if (p.length > 0) {
                t.items[idx].parent = p[0];
                t.items[idx].parentDiv = $('#'+t.el.id+'__'+p[0].id.replace(/.*__/,''))[0];

                for (var pIdx=0; pIdx < p.length; pIdx++) {
                    var
                    pHTMLid = p[pIdx].id,
                    idx2 = parseInt(pHTMLid.replace(/.*__/,''));
                    if (t.items[idx2]) {
                        psIt.push (t.items[idx2]);
                    }
                }
                t.items[idx].parents = psIt;
            }

            if (it && it.level === 1) {
                rootItems++;
                if (!t.children[t.el.id]) t.children[t.el.id] = {};
                t.children[t.el.id][it.idx] = it;
                it.levelIdx = Object.keys(t.children[t.el.id]).length - 1;
            } else if (it && it.parent) {
                var
                itp_idx = parseInt(it.parent.id.replace(/.*__/,'')),
                itp = t.items[itp_idx];
                if (!itp) debugger;
                if (!t.children[itp.idx]) t.children[itp.idx] = {};
                t.children[itp.idx][it.idx] = it;
                it.levelIdx = Object.keys(t.children[itp.idx]).length - 1;
            } //else debugger;
        });

        //if (!$('#menu__'+t.el.id)[0]) {
        $('#menu__'+t.el.id).remove();
        $(document.body).append('<div id="menu__'+t.el.id+'" class="vividMenu_menu"></div>');
        var elbcr = t.el.getBoundingClientRect();
        if (t.el.parentNode===document.body)
            $('#menu__'+t.el.id).css({
                position : 'absolute',
                top : (
                    t.el.parentNode===document.body
                    || t.el.parentNode.id === t.el.parentNode.id+'_containerDiv'
                    ? elbcr.top
                    : 0
                ),//(t.el.parentNode===document.body?elbcr.top:0),
                left : elbcr.left,//(t.el.parentNode===document.body?elbcr.left:0),
                width : $(t.el).width(),
                height : 24//$(t.el).height()
            }).append(html);
        else
            $('#menu__'+t.el.id).css({
                position : 'relative',
                marginLeft : elbcr.left,
                width : $(t.el).width(),
                height : 24//$(t.el).height()
            }).append(html);




        LIs.each(function(i,li) {
            var it = t.items[i];
            //console.log (it.level+' - '+it.label);
            if (it.level===1) {
                t.createVividButton (t, i, li);
            }
        });
        //};

    }

    createVividButton (t, i, li) {
        var
        el = $('#'+t.el.id+'__'+i)[0],
        it = t.items[i];

        el.idx = i;
        it.b = new naVividButton(el,null,t.el,true);
        //

        it.b.el.menu = t;
        it.b.el.it = it;
        it.b.el.idx = it.idx;
        it.b.el.subMenuIdx = i;
        it.b.el.level = it.level;
        if (it.level === 1) $(it.b.el).css({ display : 'block' }); else $(it.b.el).css({ display : 'none' });

        $(it.b.el).bind('mouseover', function(event) {
            debugger;
            var
            idx = parseInt(event.currentTarget.id.replace(/.*__/,'')),
            id = event.currentTarget.id.replace(/__.*/,''),
            t = na.site.settings.menus['#'+id],
            it = t.items[idx];

            if (t.currentEl_cssItem) $(event.currentTarget).css(t.currentEl_cssItem);

            //t.prevEl = t.currentEl;
            //t.currentEl = event.currentTarget;

            if (!it) return false;
            for (var elIdx in t.timeout_hideSubMenu) {
                var
                it = t.items[elIdx],
                to = t.timeout_hideSubMenu[elIdx];
                if (t.currentEl.it.level > it.level) clearTimeout(to);
            }
            t.timeout_hideSubMenu = [];



            t.shownChildren[event.currentTarget.id] = event.currentTarget;

            if (false && t.useDelayedShowingAndHiding) {
                t.cancelHidings(t);
                clearTimeout (t.timeout_showSubMenu[it.idx]);
                if (t.debugMe) na.m.log (20, 'naVividMenu.createVividButton() : bind("mouseover") : showing sub-menu for "'+it.label+'" after 500ms.', false);
                t.timeout_showSubMenu[it.idx] = setTimeout(function(t,idx,evt){
                    debugger;
                    t.onmouseover (evt);
                    delete t.timeout_showSubMenu[idx];
                }, 300, t, it.idx, event);
            } else {
                if (t.debugMe) na.m.log (20, 'naVividMenu.createVividButton() : bind("mouseover") : showing sub-menu for "'+it.label+'".', false);
                t.onmouseover (event);
                //delete t.timeout_showSubMenu[it.idx];
            }
        });


        $(it.b.el).bind('mouseout', function(event) {
            var
            idx = parseInt(event.currentTarget.id.replace(/.*__/,'')),
            id = event.currentTarget.id.replace(/__.*/,''),
            t = na.site.settings.menus['#'+id],
            it = t.items[idx];

            //$(event.currentTarget).css({border:event.currentTarget.border});
            //$(event.currentTarget).css({boxShadow:event.currentTarget.boxShadow});
            if (t.currentEl_cssItem) $(event.currentTarget).css(t.currentEl_cssItem);
            if (!it) return false;

            for (var elIdx in t.timeout_showSubMenu) {
                var to = t.timeout_showSubMenu[elIdx];
                clearTimeout (to);
            }
            t.timeout_showSubMenu = {};


            /*t.prevEl = t.currentEl;
            t.currentEl = null;
            debugger;*/
            if (it.level > 0 ) {
                //if (t.debugMe) na.m.log (20, 'naVividMenu.createVividButton() : bind("mouseout") : hiding sub-menu for "'+it.label+'" after 500ms.', true);

                if (false && t.useDelayedShowingAndHiding) {
                    t.cancelHidings(t);
                    t.timeout_hideSubMenu[it.idx] = setTimeout(function(t,idx,evt){
                        t.onmouseout(evt);
                        delete t.timeout_hideSubMenu[idx]
                    }, 150, t, it.idx, event);
                } else {
                    t.onmouseout(event);

                    delete t.timeout_hideSubMenu[it.idx];
                }

                for (var i in t.timeout_hideAll) {
                    clearTimeout (t.timeout_hideAll[i]);
                }
                t.timeout_hideAll = {};

            }
        });

        $(it.b.el).bind('click', function() {
            t.onclick(it);
        });

    }

    onmouseover (event) {
        var
        t = this,
        evt = event,
        el = event.currentTarget,
        myKids = t.children[el.it.idx];

        if (!t.timeout_onmouseover) t.timeout_onmouseover = {};
        if (t.timeout_onmouseover[el.it.idx]) clearTimeout (t.timeout_onmouseover[el.it.idx]);

        if (t.currentEl === el) return false;
        //if (t.prevEl && t.currentEl && t.prevEl === t.currentEl) return false;
        //if (t.prevEl && t.currentEl) alert (t.prevEl.id+' - ' +t.currentEl.id);

        t.prevEl = t.currentEl;
        if (t.currentEl_cssItem) $(t.prevEl).css(t.currentEl_cssItem);
        t.currentEl = evt.currentTarget;

        if (t.timeout_onmouseover[el.it.idx]) clearTimeout (t.timeout_onmouseover[el.it.idx]);
        t.timeout_onmouseover[el.it.idx] = setTimeout(function(t, el, evt) {
        //debugger;
            if (t.debugMe) na.m.log (20, 'naVividMenu.createVividButton() : bind("mouseover") : showing sub-menu for "'+el.it.label+'"', false);

            t.prevDisplayedEl = t.currentEl;
            t.currentDisplayedEl = t.currentEl;//evt.currentTarget;

            t.currentDisplayedEl_negativeOffsetY = null;

            for (var kidIdx in myKids) {
                var
                it = myKids[kidIdx],
                dim = t.getDimensions(t, el, false);

                //setTimeout (function(t,it,dim,evt) {
                    t.showMenuItem (t, it, dim, evt);
                //}, kidIdx * 10, t, it, dim, evt);
            }
            if (el.it.level > 1) t.showBackPanel(t);
            t.onmouseout (event);
        }, 200, t, el, event);

    }

    onmouseout (event) {
        var
        t = this,
        el = event.currentTarget,
        myKids = t.children[el.it.idx];

        var
        t = this,
        el = event.currentTarget,
        it = t.items[el.it.idx],
        menu = $('#menu_'+t.el.id)[0],
        toHide = t.mustHide (t, it, event);

        var prevs = [], prevsLabels = [];
        for (var i=0; i < toHide.prevEl.length; i++) {
            var idxOrEl = toHide.prevEl[i];
            if (typeof idxOrEl=='object') {
                prevs.push(idxOrEl);
                prevsLabels.push (idxOrEl.id);
            } else {
                var it2 = t.items[idxOrEl];
                if (it2.b) {
                    prevs.push(it2.b.el);
                    prevsLabels.push (it2.label);
                }
            }
        }
        //na.m.log (26, 'naVividMenu.onmouseout(label='+it.label+') (1) : prevsLabels = '+prevsLabels, false);


        var parentPanels = [], currs = [], currsLabels = [];
        for (var i=0; i < toHide.currentEl.length; i++) {
            var idxOrEl = toHide.currentEl[i];
            if (typeof idxOrEl=='object') {
                currs.push (idxOrEl);
                currsLabels.push (idxOrEl.id);
            } else {
                var it2 = t.items[idxOrEl];
                if (it2.b) {
                    currs.push(it2.b.el);
                    currsLabels.push (it2.label);
                }
            }
        }
        //na.m.log (26, 'naVividMenu.onmouseout(label='+it.label+') (1) : currsLabels = '+currsLabels, false);

        prevsLabels = [];
        if (t.useDelayedShowingAndHiding)
            $('.vividMenu_item, .vividMenu_subMenuPanel', menu).not(rootLevel).not(currs).each(function(idx,el) {
                if (el.it && el.id.indexOf('panel')!==-1) prevsLabels.push ('PANEL:'+el.it.label);
                else if (el.it) prevsLabels.push (el.it.label);
            });
        else
            $(currs).not(prevs).each(function(idx,el) {
                if (el.it && el.id.indexOf('panel')!==-1) prevsLabels.push ('PANEL:'+el.it.label);
                else if (el.it) prevsLabels.push (el.it.label);
            });
        //na.m.log (26, 'naVividMenu.onmouseout(label='+it.label+') (2) : prevsLabels = '+prevsLabels, false);


        currsLabels = [];
        $(currs).not(prevs).each(function(idx,el) {
            if (el.it) currsLabels.push (el.it.label);
        });
        //na.m.log (26, 'naVividMenu.onmouseout(label='+it.label+') (2) : currsLabels = '+currsLabels, false);
        //console.trace();

        var rootLevel = [];
        $('.vividMenu_item, .vividMenu_subMenuPanel', menu).each(function(idx,div) {
        //$('.vividMenu_item, .vividMenu_subMenuPanel', t.el).each(function(idx,div) {
            var
            idx = parseInt(div.id.replace(/.*__/,'')),
            it = t.items[idx];
            if (it && it.level === 1 && div.id.indexOf('_panel')===-1) rootLevel.push (div);
        });


        if (t.currentEl) {
            var currPanel =
                t.currentEl.it.parents && t.currentEl.it.parents.length > 0
                ? $('#'+t.el.id+'__panel__'+t.currentEl.it.parents[0].idx)[0]
                : null;
            if (currPanel) currs.push(currPanel);
            currPanel = $('#'+t.el.id+'__panel__'+t.currentEl.it.idx)[0];
            if (currPanel && !currs.includes(currPanel)) currs.push(currPanel);

            if (t.currentEl.it.parents && t.currentEl.it.parents.length > 0) {
                for (var i=0; i < t.currentEl.it.parents.length; i++) {
                    var p = t.currentEl.it.parents[i];
                    //console.log ('t222',p);
                    parentPanels.push ($('#'+t.el.id+'__panel__'+p.idx)[0]);
                }
            }
        }

        if (t.prevEl && t.currentEl && t.prevEl.it.level !== t.currentEl.it.level) {
            var currPanel =
                t.prevEl.it.parents && t.prevEl.it.parents.length > 0
                ? $('#'+t.el.id+'__panel__'+t.prevEl.it.parents[0].idx)[0]
                : null;
            if (currPanel) currs.push(currPanel);
            currPanel = $('#'+t.el.id+'__panel__'+t.prevEl.it.idx)[0];
            if (currPanel && !currs.includes(currPanel)) currs.push(currPanel);
        }

        if (t.currentEl) {
            var myKids = t.children[t.currentEl.it.idx];
            for (var kidIdx in myKids) {
                var it2 = myKids[kidIdx];
                if (it2.b) currs.push(it2.b.el);
            }
        }

        var myPeers = [];
        var prevKids = [];
        if (
            t.currentEl
            && t.prevEl
            && t.currentEl.it.level !== t.prevEl.it.level
            && t.currentEl.it.parents && t.currentEl.it.parents.length > 0
        ) {
            var myPeers_idxs = t.children[t.currentEl.it.parents[0].idx];
            for (var peerIdx in myPeers_idxs) {
                var it2 = myPeers_idxs[peerIdx];
                if (it2.b) myPeers.push (it2.b.el);
            }
            var panel = $('#'+t.el.id+'__panel__'+t.currentEl.it.parents[0].idx);
            //if (panel[0]) myPeers.push (it2.b.el);

            if (t.children[it2.idx] && t.children[it2.idx].length && t.children[it2.idx].length > 0) {
                var peersKids_idx = t.children[it2.idx];
                for (var peerKidIdx in peersKids_idx) {
                    var it3 = peersKids_idx[peerKidIdx];
                    if (it3.b) prevKids.push (it3.b.el);
                }
            }
        }

        if (
            t.currentEl
            && t.prevEl
            && t.currentEl.it.level === t.prevEl.it.level
            && t.prevEl.it.parents && t.prevEl.it.parents.length > 0
        ) {
            var prevKids_idxs = t.children[t.prevEl.it.idx];
            for (var peerIdx in prevKids_idxs) {
                var it2 = prevKids_idxs[peerIdx];
                if (it2.b) prevKids.push (it2.b.el);
            }
            var panel = $('#'+t.el.id+'__panel__'+t.prevEl.it.idx);
            if (panel[0]) prevKids.push (panel[0]);
        }


        currs = $(currs).not(myPeers).not(prevKids);

//debugger;
        if (t.useFading) {
            $('.vividMenu_item', menu).add('.vividMenu_subMenuPanel').not(rootLevel).not(currs).not(myPeers).not(parentPanels)
                .stop(true,true).fadeOut(t.fadingSpeed, function () {
                    if (
                        $(this).is('.vividMenu_subMenuPanel')
                        && el.id.indexOf(t.el.id)!==-1
                    ) $(this).remove();
                });
        } else {
            $('.vividMenu_item, .vividMenu_subMenuPanel', menu)
                .not(rootLevel).not(currs).not(myPeers).not(parentPanels)
                .css({display:'none'});
            $('.vividMenu_subMenuPanel').each(function(idx,el){
                if (el.id.indexOf(t.el.id)!==-1) $(this).remove();

            });
        }

    }

    showMenuItem (t, it, dim /* dimensions */, evt /* event */) {
        var
        offsetX = 0,
        offsetY = 0,
        tel_bcr = t.el.getBoundingClientRect(),
        itp = null,
        i = it.levelIdx;


        if (!it.b) t.createVividButton (t, it.idx, it.li);



        if (it.parents && it.parents[0]) {
            var
            parentItem = $('#'+t.el.id+'__'+it.parents[0].idx)[0],
            p_bcr = parentItem.getBoundingClientRect(),
            itp_idx = parseInt(parentItem.id.replace(/.*__/,'')),
            itp = t.items[itp_idx],
            offsetY =
                dim.verDirection == 'south'
                ? p_bcr.top + na.d.g.margin
                : p_bcr.top - na.d.g.margin;


            var
            numKids = Object.keys(t.children[itp_idx]).length,
            sqrtNumKids = Math.ceil(Math.sqrt(numKids)),
            h = dim.space2bottom > dim.space2top ? dim.space2bottom : dim.space2top,
            w = dim.space2left > dim.space2right ? dim.space2left : dim.space2right,
            numRows = (h/(($(it.b.el).outerHeight() + na.d.g.margin))  );
            var
            numColumns = (w / (($(it.b.el).outerWidth() + na.d.g.margin))),
            numColumns = Math.floor(numKids/numRows);
            if (numColumns===0) numColumns = 1;
            var
            numRows = Math.ceil(numKids/numColumns);
            if (numRows===0) numRows = 1;
            console.log ('w='+w+', numKids='+numKids+', ohm='+($(it.b.el).outerHeight()+na.d.g.margin)+', numKids/numRows='+(numKids/numRows)+', owm='+($(it.b.el).outerWidth() + na.d.g.margin)+', numRows='+numRows+', numColumns='+numColumns);
            // na.site.setStatusMsg('numRows='+numRows+', numColumns='+numColumns, true); // NEVER AGAIN IN NON-ESSENTIAL CODE! forces entire page resizing!

            var
            row = 1,
            column = (t.columnDisplayed ? t.columnDisplayed : 1),
            lidx = it.level === 1 ? it.levelIdx : it.levelIdx + 1 - (numRows * (column-1));
            //if (it.label=='Couples') debugger;

            //if (it.label=='Sunrise & Sunset') debugger;
            //if (it.label=='Space & Night Sky') debugger;

            while (lidx > numColumns) {
                row++;
                t.columnDisplayed++;
                lidx -= 1;
            }
            var column = lidx;
            t.columnDisplayed = column;
            //if (it.label=='Simple') debugger;
            t.numRows = row;
            t.numColumns = column;
            var
            owm = ($(it.b.el).outerWidth() + na.d.g.margin),
            offsetX =
                dim.horDirection=='east'
                ? p_bcr.left - tel_bcr.left - (na.d.g.margin * ((column-1)))
                : p_bcr.left - tel_bcr.left - (na.d.g.margin * ((column-1)));
        } else {
            var
            tel_bcr = t.el.getBoundingClientRect(),
            offsetX = (
                t.el.parentNode===document.body
                || t.el.parentNode.id === t.el.parentNode.id+'_containerDiv'
                ? na.d.g.margin * 2 * it.levelIdx
                : tel_bcr.left
            ),
            offsetY = tel_bcr.top - (it.b.el.offsetHeight/2) + (na.d.g.margin/2),
            numRows = 1,
            numColumns = $('#'+t.el.id+' > .vividMenu_mainUL > li').length,
            row = 0,
            column = it.levelIdx +1;
        };
        it.row = row;
        it.column = column;
        it.numColumns = numColumns;
        it.numRows = numRows;

        if (!t.currentDisplayedEl_negativeOffsetY) {
            var
            cel_bcr = (
                t.currentDisplayedEl
                ? t.currentDisplayedEl.getBoundingClientRect()
                : {top: na.d.g.margin, height : $(it.b.el).height() }
            );

            t.currentDisplayedEl_negativeOffsetY = cel_bcr.top + $(t.currentEl).height() - na.d.g.margin;
        }

        if (t.type==='horizontal') {

            var
            dim2 = t.getDimensions(t, it.b.el, false),
            dim3 = it.level > 1 ? dim2 : dim,
            o = {
                a : column -1,
                b : it.level < 3
                    ? row - 1
                    : row,
                c : it.levelIdx - (column * row),
                d : column
            },

            pdel_bcr = (
                t.prevDisplayedEl
                ? t.prevDisplayedEl.getBoundingClientRect()
                : {top: na.d.g.margin, height : $(it.b.el).height() }
            ),
            cel_bcr = (
                t.currentDisplayedEl
                ? t.currentDisplayedEl.getBoundingClientRect()
                : {top: na.d.g.margin, height : $(it.b.el).height() }
            );


            var
            // possibly columned menu items;
            typeHorizontal_level_horizontalPosition_offsetX = $(it.b.el).width() * (column-1),
            typeHorizontal_level_horizontalPosition_margin =
                it.level > 2
                ? ((dim.bws.left+dim.bws.right)*(column-1))
                    + (na.d.g.margin*(column-1))
                    + (na.d.g.margin)
                : 0,

            typeHorizontal_level_verticalPosition_offsetY =
                it.level === 1
                ? na.d.g.margin
                : cel_bcr.top + $(t.currentDisplayedEl).height() - t.currentDisplayedEl_negativeOffsetY,
                //($(it.b.el).height() * (row-(it.level===1?1.8:2))) + (2*na.d.g.margin),//(row + (t.percentageFor_rainbowPanels==100?1:0)),
            typeHorizontal_level_verticalPosition_margin =
                it.level === 1
                ? 0
                : na.d.g.margin;


            //if (it.label=='Simple') debugger;
            //if (it.label=='Sunrise & Sunset') debugger;
            //if (it.label=='Space & Night Sky') debugger;
            //if (!t.currentDisplayedEl || it.path==t.currentDisplayedEl.it.path) {
                t.prevDisplayedEl = t.currentDisplayedEl;
                t.currentDisplayedEl = it.b.el;//evt.currentTarget;
            //}




            if (

                it.level === 1

            ) {
                if (dim.horDirection=='west') {
                    var left =
                        offsetX
                        - Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                        - typeHorizontal_level_horizontalPosition_margin;

                } else if (dim.horDirection=='east') {
                    var left =
                        offsetX
                        + Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                        + typeHorizontal_level_horizontalPosition_margin;

                } else {
                    var left = offsetX;
                }
                var
                top = offsetY;/*dim3.verDirection=='south'
                    ? offsetY
                        + typeHorizontal_level_verticalPosition_offsetY
                        + typeHorizontal_level_verticalPosition_margin
                    : dim3.verDirection=='north'
                        ? offsetY
                            - typeHorizontal_level_verticalPosition_offsetY
                            - typeHorizontal_level_verticalPosition_margin
                        : offsetY;*/

            } else {
                if (it.level < 3) {
                    if (dim.horDirection=='west') {
                        var left =
                            offsetX
                            - Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                            - typeHorizontal_level_horizontalPosition_margin;

                    } else if (dim.horDirection=='east') {
                        var left =
                            offsetX
                            + Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                            + typeHorizontal_level_horizontalPosition_margin;

                    } else {
                        var left = offsetX;
                    }
                } else {
                    if (dim.horDirection=='west') {
                        var left =
                            offsetX
                            - Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                            - typeHorizontal_level_horizontalPosition_margin;

                    } else if (dim.horDirection=='east') {
                        var left =
                            offsetX
                            + Math.abs(typeHorizontal_level_horizontalPosition_offsetX)
                            + typeHorizontal_level_horizontalPosition_margin;

                    } else {
                        var left = offsetX;
                    }
                }
                var
                numMargins = (
                    $(t.prevDisplayedEl).height() > $(t.currentDisplayedEl).height()
                    ? 2
                    : 3
                ),
                top = dim.verDirection=='south'
                    ? offsetY
                        + typeHorizontal_level_verticalPosition_offsetY
                        + typeHorizontal_level_verticalPosition_margin
                        //+ ($(it.b.el).height() * (row-1))
                        + (na.d.g.margin * numMargins)
                    : offsetY
                        - typeHorizontal_level_verticalPosition_offsetY
                        - typeHorizontal_level_verticalPosition_margin
                        //- ($(it.b.el).height() * (row-1))
                        - (na.d.g.margin * numMargins);
            }
            var
            msg = {
                w : 'showMenuItem()',
                label : it.label,
                it_b_el_offsetHeight : it.b.el.offsetHeight,
                dim3 : dim2,
                numRows : numRows,
                row : row,
                numColumns : numColumns,
                column : column,
                offsetX : offsetX,
                offsetY : offsetY,
                typeHorizontal_level_horizontalPosition_offsetX : typeHorizontal_level_horizontalPosition_offsetX,
                typeHorizontal_level_horizontalPosition_margin : typeHorizontal_level_horizontalPosition_margin,
                typeHorizontal_level_verticalPosition_offsetY : typeHorizontal_level_verticalPosition_offsetY,
                typeHorizontal_level_verticalPosition_margin : typeHorizontal_level_verticalPosition_margin,
                left : left,
                top : top
            };
            //na.m.log (25, JSON.stringify(msg,null,2), false);

        } else { // t.type=='vertical'
            var
            k = row,
            l = column-1;


            if (
                it.level === 1
            ) {
                var left = 0;
            } else {
                if (dim.horDirection=='west') {
                    var left = offsetX - ($(it.b.el).outerWidth()*l) - ((na.d.g.margin)*l);
                } else {
                    var left = offsetX + ($(it.b.el).outerWidth()*l) + ((na.d.g.margin)*l);
                }
            }
            t.prevDisplayedEl = t.currentDisplayedEl;
            t.currentDisplayedEl = it.b.el;//evt.currentTarget;

            var
            pdel_bcr = (
                t.prevDisplayedEl
                ? t.prevDisplayedEl.getBoundingClientRect()
                : {top: $(it.b.el).outerHeight() + na.d.g.margin}
            ),
            cel_bcr = (
                t.currentDisplayedEl
                ? t.currentDisplayedEl.getBoundingClientRect()
                : {top : $(it.b.el).outerHeight() + na.d.g.margin}
            ),
            top = dim.verDirection=='south'
                ? offsetY + ($(it.b.el).outerHeight()*it.row) + (na.d.g.margin*it.row)
                : dim.verDirection=='north'
                    ? offsetY - ($(it.b.el).outerHeight()*it.row) - (na.d.g.margin*it.row)
                    : offsetY;
        }

        if (
            (t.type=='horizontal' && it.level > 2)
            || (t.type=='vertical' && it.level > 1)
        ) {
            if (dim.space2left > dim.space2right) {
                left -= $(it.b.el).width()*0.7;
            } else
                left += $(it.b.el).width()*0.7;

        }

        if (
            (t.type=='horizontal' && it.level > 1)
            || (t.type=='vertical' && it.level > 1)
        ) {
            if (it.level > 1) top -= $(it.b.el).height()/3;
        }
        //if (t.debugMe) na.m.log (25, 'label='+it.label+', left='+left, false);
        var
        position =
            it.level === 1
            && (
                $(it.b.el).parents('.vividScrollpane').length > 0
            )
                ? 'relative'
                : 'fixed';

        if (t.useFading) {
            $(it.b.el).css ({
                position : position,
                opacity : 1,
                display : 'none',
                marginLeft : left,
                marginTop : top,
                zIndex : 20000 + (
                    (it.level * 2)
                )
            });
            $(it.b.el).stop(true,true).fadeIn(t.fadingSpeed).delay(100);
        } else
            $(it.b.el).css ({
                opacity : 1,
                display : 'block',
                position : position,
                marginLeft : left,
                marginTop : top,
                zIndex : 20000 + (
                    dim.verDirection=='south' ? (it.level * 2) : (it.level * 2)
                )
            }).delay(100);

        var
        pit = parentItem;

        if (pit) {
            var
            c = t.children[pit.idx],
            k = Object.keys(c),
            x1 = t.children[pit.idx][parseInt(k[0])],
            x2 = t.children[pit.idx][parseInt(k[k.length-1])];
//if (pit.id=='textFontFamily__0') debugger;
            if (it.idx === x2.idx) {
                var
                it2 = t.items[pit.it.idx],
                panelID = t.el.id+'__panel__'+pit.it.idx,
                html = '<div id="'+panelID+'" class="vividMenu_subMenuPanel">&nbsp;</div>',
                panel = $('#'+panelID);
                if (!panel[0]) t.childPanels[it2.idx] = $('body').append(html);
                panel = $('#'+panelID)[0];
                panel.it = pit.it;


                t.showPanel (
                    t, panel, it, pit.it, dim, numColumns, (numKids / numColumns),
                    $(x1.b.el).offset().left - $(t.el).offset().left,
                    $(x1.b.el).offset().top - $(t.el).offset().top
                );
            }
        }
    }

    getElementsLabels (t, a) {
        var r = {};
        for (var i=0; i<a.length; i++) {
            var it = a[i].it;
            r[it.idx] = it.label;
        }
        return r;
    }
    getIndexesLabels (t, a) {
        var r = {};
        for (var i=0; i<a.length; i++) {
            var it = t.items[parseInt(a[i])];
            r[a[i]] = it.label;
        }
        return r;
    }

    mustHide (t, it, evt) {
        var
        toBeHidden = [], // stores HTML elements (vividButtons and panel elements)
        items_currentEl = [],//$.extend( [], t.items_currentEl ),
        items_prevEl = [],//$.extend( [], t.items_prevEl ), // stores the idx part of t.items[idx]
        items_final = [];//$.extend( [], t.items_final ); // stores the idx part of t.items[idx]

        if (t.prevEl && t.prevEl.it.parents && t.prevEl.it.parents.length)
        for (var i=0; i < t.prevEl.it.parents.length; i++) {
            var parentIdx = parseInt(t.prevEl.it.parents[i].idx);
            items_prevEl.push(parentIdx);

            var
            parentIt = t.items[parentIdx],
            parentKids = t.children[parentIt.idx];

            for (var kidsIdx in parentKids) items_prevEl.push(kidsIdx);
        }
        /* NOT WISE:
        var
        kids = t.children[t.prevEl.it.idx];
        if (kids)
            for (var kidIdx in kids) items_prevEl.push(kidIdx);
        */
        if (t.prevEl) {
            items_prevEl.push(t.prevEl);
            var
            idx = t.prevEl.it.idx,
            panelID = '#'+t.el.id+'__panel__'+idx,
            panel = $(panelID)[0];
            if (panel) items_prevEl.push (panel);
        }



        if (t.currentEl && t.currentEl.it.parents && t.currentEl.it.parents.length)
        for (var i=0; i < t.currentEl.it.parents.length; i++) {
            var parentIdx = parseInt(t.currentEl.it.parents[i].idx);
            items_currentEl.push(parentIdx);

            var
            parentIt = t.items[parentIdx],
            parentKids = t.children[parentIt.idx];

            for (var kidsIdx in parentKids) items_currentEl.push(kidsIdx);
        }
        /* NOT WISE:
        var
        kids = t.children[t.currentEl.it.idx];
        if (kids)
            for (var kidIdx in kids) items_currentEl.push(kidIdx);
        */
        if (t.currentEl) {
            items_currentEl.push(t.currentEl);
            var
            idx = t.currentEl.it.idx,
            panelID = '#'+t.el.id+'__panel__'+idx,
            panel = $(panelID)[0];
            //debugger;
            if (panel) items_currentEl.push (panel);
        }



        var items_final = $.extend([], items_prevEl);
        for (var i=0; i < items_currentEl.length; i++) {
            items_final = items_final.remove (items_currentEl[i]);
        }


        return {
            currentEl : items_currentEl,
            prevEl : items_prevEl
        };
    }

    cancelHidings (t) {
        for (var idx in t.timeout_hideSubMenu) {
            clearTimeout(t.timeout_hideSubMenu[idx]);
        }
        t.timeout_hideSubMenu = {};

        for (var bp_id in t.timeout_hideAll) {
            if (!t.timeout_hideAll[bp_id]) {
                t.timeout_hideAll[bp_id] = [];
            } else {
                for (var i=0; i<t.timeout_hideAll[bp_id].length; i++) {
                    clearTimeout(t.timeout_hideAll[bp_id][i]);
                };
                t.timeout_hideAll[bp_id] = [];
            };
        }
    }

    showPanel (t, panel, it, pit, dim /* dimensions */, numColumns, numRows, offsetX, offsetY) {
        var
        dim = t.getDimensions(t, pit.b.el, false),
        dim2 = t.getDimensions(t, pit.b.el, false),
        i = pit.levelIdx;
        panel.it = pit;

        $(panel).bind('mouseover', function (event) {
            $('#'+t.el.id+'__backPanel').remove();
            t.showBackPanel(t);

            var panel = event.currentTarget;
            if (!t.panelsShown[panel.id]) t.panelsShown[panel.id] = {
                panel : panel,
                hideAll : null,
                hideMe : null,
                hideKids : null
            };

/*            t.prevEl = t.currentEl;
            t.currentEl = event.currentTarget;
            t.cancelHidings(t);*/


        });
        $(panel).bind('mouseout', function (event) {
            var
            panel = event.currentTarget,
            elIdx = parseInt(panel.id.replace(/.*__/,'')),
            panelKids = t.children[elIdx],
            firstPanelKidIdx = parseInt(Object.keys(t.children[elIdx])[0]);

            if (t.panelsShown[panel.id].hideAll) clearTimeout (t.panelsShown[panel.id].hideAll);
            t.panelsShown[panel.id].hideAll = t.hideAll(t);

            /*
            if (t.timeout_hideSubMenu[elIdx]) clearTimeout(t.timeout_hideSubMenu[elIdx]);
            t.timeout_hideSubMenu[elIdx] = setTimeout(function(t,idx,evt){
                t.onmouseout(evt);
                delete t.timeout_hideSubMenu[idx]
            }, 750, t, elIdx, event);
            */


        });
        var
        background1 = 'rgba('+(100+Math.random()*150)+','+(100+Math.random()*150)+','+(100+Math.random()*150)+', 0.55)',
        background2 = 'rgba('+(100+Math.random()*150)+','+(100+Math.random()*150)+','+(100+Math.random()*150)+', 0.4)',
        background2a1 = ''+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255)+','+Math.ceil(Math.random()*255),
        background2a = 'rgba('+background2a1+',0.55)',
        background2b = 'rgba('+background2a1+',0.7)',
        background3 = 'rgba(0,0,0,0.0001)',
        border = '2px solid '+background2b,
        numVer = Math.floor(Object.keys(t.children[pit.idx]).length/numColumns),
        c = t.children[pit.idx],
        k = Object.keys(c),
        x1 = t.children[pit.idx][parseInt(k[0])],
        x2 = t.children[pit.idx][parseInt(k[k.length-1])],
        x1_bcr = x1.b.el.getBoundingClientRect(),
        x2_bcr = x2.b.el.getBoundingClientRect(),
        tel_bcr = t.el.getBoundingClientRect(),
        itp_bcr = pit.b.el.getBoundingClientRect(),
        cssPanelWidth =
            t.el.parentNode!==document.body
            ? ($(x1.b.el).outerWidth() * (it.numColumns)) + (na.d.g.margin*it.numColumns) + (na.d.g.margin*2)
            : ($(x1.b.el).outerWidth() * (it.numColumns)) + (na.d.g.margin*it.numColumns) + (na.d.g.margin*2),
        cssPanel = {
            position : 'absolute',
            border : border,
            borderRadius : 8,
            background : background2a,
            boxShadow : 'inset 0px 0px 3px 2px rgba(0,0,0,0.8), 4px 4px 2px 2px rgba(0,0,0,0.7)',
            width : cssPanelWidth,
            height : Math.abs(Math.abs(x2_bcr.top) - $(x2.b.el).height() - itp_bcr.top )+ (na.d.g.margin*4),
            left :
                dim.horDirection=='east'
                ? (
                    itp_bcr.left
                    + (
                        x1.level > 2
                        ? ($(x1.b.el).outerWidth() * 0.7) - (na.d.g.margin*1.5)
                        : t.type === 'vertical'
                            ? ($(x1.b.el).outerWidth() * 0.7) - (na.d.g.margin*1.5)
                            : -1 * (na.d.g.margin*1.5)
                    )
                )
                : it.level < 3
                    ? (
                        itp_bcr.left
                        - cssPanelWidth
                        + (
                            x1.level > 2
                            ? ($(x1.b.el).outerWidth() * 0.3)
                            : ($(x1.b.el).outerWidth() * 0.3)
                        )
                        + (na.d.g.margin*1.5)
                    )
                    : (
                        itp_bcr.left
                        - cssPanelWidth
                        + ($(x1.b.el).outerWidth() * 0.3)
                        + (na.d.g.margin*1.5)

                        /*+ (
                            x1.level > 2
                            ? ($(x1.b.el).outerWidth() * 0.8) - 10
                            : - ($(x1.b.el).outerWidth()/2)
                        )*/
                    )
                ,
            top : (
                dim.verDirection=='north'
                ? x2_bcr.top - 10
                : x1_bcr.top - 10
            ),//$(x1.b.el).offset().top - $(t.el).offset().top - 20,
            zIndex : it.b.el.style.zIndex-1//t.el.style.zIndex - (it.b.el.style.zIndex + 5)
        },
        cssItem = {
            border : border,
            boxShadow : 'inset 2px 2px 4px 4px rgba(255,255,255,0.4), 2px 2px 1px 1px rgba(0,0,0,0.55)'
        },
        panelID = t.el.id+'__panel__'+it.parents[0].idx,
        itID = t.el.id+'__'+pit.idx,
        html = '<div id="'+panelID+'" class="vividMenu_subMenuPanel">&nbsp;</div>';
        if (t.percentageFor_rainbowPanels===0) {
            cssPanel.borderRadius = 0;
            cssPanel.background = background3;
            cssPanel.border = '0px solid transparent';
            cssPanel.boxShadow = 'none';
        };
        t.currentEl_cssItem = cssItem;

        var
        itsKids = t.children[pit.idx],
        kids = [];
        for (var kidIdx in itsKids) {
            var itKid = itsKids[kidIdx];
            kids.push (itKid.b.el);
        }
        if (t.percentageFor_rainbowPanels>0) $(kids).css(cssItem);
        t.currentEl_cssItem.border = 'rgba(255,255,255,0.7)';

        //if (!$('#'+panelID)[0]) {
        //$('#'+panelID).remove();
            var idx = (
                it.parentDiv
                ? it.parentDiv.it.idx
                : it.idx
            );
            t.childPanels[idx] = $(document.body).append(html);
            //debugger;
            $('#'+panelID).css (cssPanel).fadeIn(t.fadingSpeed);
        //}
    }

    showBackPanel (t) {
        // show backpanel
        var html = '<div id="'+t.el.id+'__backPanel" class="vividMenu_backPanel">&nbsp;</div>';
        var bp = $('#'+t.el.id+'__backPanel');
        if (!bp[0]) {
            $('body').append(html);
            var bp = $('#'+t.el.id+'__backPanel');
        }

        $(bp).css({
            position : 'absolute',
            left : 0,
            top : 0,
            width : window.innerWidth,
            height : window.innerHeight,
            zIndex : 19*1000,
            background : 'rgba(0,0,0,0.0001)'
        });
        $(bp).bind('mouseover', function (event) {
            var bp = event.currentTarget;
            t.hideAll(t,bp);
        });
    }

    hideAll (t, bp) {
            if (!bp || !(typeof bp.id=='string')) return false;
            if (!t.timeout_hideAll[bp.id]) {
                t.timeout_hideAll[bp.id] = [];
            } else {
                for (var i=0; i<t.timeout_hideAll[bp.id].length; i++) {
                    clearTimeout(t.timeout_hideAll[bp.id][i]);
                };
                t.timeout_hideAll[bp.id] = [];
            };
            var to = t.timeout_hideAll[bp.id];
            t.timeout_hideAll[bp.id].push( setTimeout(function (t, bp) {
                var hiding = [];
                $('.vividMenu_item', $('#menu_'+t.el.id)[0]).each(function(idx,button) {
                    var
                    it = t.items[idx],
                    panelID = (it ? t.el.id+'__panel__'+it.idx : null),
                    panel = $('#'+panelID)[0];
                    if (panel) hiding.push(panel);
                    if (it && it.level!==1 && it.b) hiding.push (it.b.el);
                });
                $('.vividMenu_backPanel').each(function(idx,el){
                    hiding.push(el);
                });

                if (t.useFading) {
                    $(hiding).stop(true,true).fadeOut(t.fadingSpeed);
                    $('.vividMenu_subMenuPanel').stop(true,true).fadeOut(t.fadingSpeed, function () {
                        $(this).remove();
                    });
                } else {
                    $(hiding).css({display:'none'});
                    $('.vividMenu_backPanel').remove();
                }
                t.shownChildren = {};
                $(bp).remove();
            }, 500, t, bp));
            var ha = t.timeout_hideAll[bp.id];
            return ha[ha.length-1];
    }



    getDimensions (t, el, restrict) {
        var
        t = this,
        vbCheckerID = t.el.id+'_vbChecker',
        bws = na.m.borderWidths($('#'+vbCheckerID)[0]),
        e = el,//.it && el.it.parentDiv ? el.it.parentDiv : el,
        ebcr = e.getBoundingClientRect(),
        pbcr = (
            el.it.parentDiv
            ? el.it.parentDiv.getBoundingClientRect()
            : t.el.getBoundingClientRect()
        ),
        dim = { // dimensions
            space2right :
                $(e).attr('controlledBy')=='na.desktop'
                ? $(e).width()
                : Math.abs(window.innerWidth - ebcr.left - bws.left - bws.right - 20),
            space2left : Math.abs(ebcr.left),
            space2top : Math.abs(ebcr.top - bws.top),
            space2bottom : Math.abs(window.innerHeight - ebcr.top - $(e).height() - bws.top - bws.bottom),
        };
        if (el.it.numColumns) {
            dim.space2right -= (na.d.g.margin * el.it.numColumns);
            dim.space2left -= ($(e).width()*el.it.numColumns);
        };
        if (el.it.level > 2) {
            dim.space2right -= ($(e).outerWidth()*0.8);
            dim.space2left += ($(e).outerWidth()*0.8);
        };
        dim.bws = bws;
        //if ($('a',el)[0].innerText=='Select Font') debugger;
        //if ($('a',el)[0].innerText=='ABeeZee') debugger;

        var
        avoid1 = $(el).attr('avoid'),
        oEl = $(el).offset(),
        oElH = el.outerHeight,
        oElW = el.outerWidth,
        closest = {
            left : null,
            right : null,
            top : null,
            bottom : null
        },
        closestGap = {
            left : null,
            right : null,
            top : null,
            bottom : null
        };
        if (typeof avoid1 == 'string' && avoid1 !== '') {
            var avoid2 = JSON.parse(avoid1);
            for (var i=0; i < avoid2.length; i++) {
                var
                avoid3 = avoid2[i],
                avoidEl = $(avoid3),
                o = avoidEl.offset(),
                oh = avoidEl.outerHeight(),
                ow = avoidEl.outerWidth();

                // TODO : (LOW-PRIORITY) evaluate y-axis as well when evaluating x-axis, and vice-versa.


                // evaluate dim.space2left
                if (o.left < oEl.left) {
                    if (!closest.left) {
                        closest.left = avoidEl;
                        closestGap.left = oEl.left - ( $(closest.left).offset().left + closest.left.outerWidth() );
                    } else {
                        var
                        gapClosest = oEl.left - ( $(closest.left).offset().left + closest.left.outerWidth() ),
                        gapCurrent = oEl.left - ( o.left + ow );
                        if (gapCurrent < gapClosest) {
                            closest.left = avoidEl;
                            closestGap.left = gapCurrent;
                        }
                    }
                }

                // evaluate dim.space2right
                if (oEl.right < o.right) {
                    if (!closest.right) {
                        closest.right = avoidEl;
                        closestGap.right = $(closest.right).offset().right - (oEl.right + oElW);

                    } else {
                        var
                        gapClosest = $(closest.right).offset().right - (oEl.right + oElW),
                        gapCurrent = o.right - (oEl.right + oElW);
                        if (gapCurrent < gapClosest) {
                            closest.right = avoidEl;
                            closestGap.right = gapCurrent;
                        }
                    }
                }
            } // for i < avoid2.length

            if (closestGap.left) dim.space2left = closestGap.left;
            if (closestGap.right) dim.space2right = closestGap.right;
            if (closestGap.top) dim.space2top = closestGap.top;
            if (closestGap.bottom) dim.space2bottom = closestGap.bottom;
        }

        if (typeof el.idx == 'number') {
            var
            it = t.items[el.idx],
            parentLI = $('#'+t.el.idx+'__li__'+el.idx).parents('ul > li')[0];

            if (parentLI) {
                var
                parentIdx = parseInt(parentLI.id.replace(/.*__/,'')),
                itp = t.items[parentIdx];
            }
        }

        dim.horDirection = dim.space2right > dim.space2left ? 'east' : 'west';
        dim.verDirection = dim.space2top > dim.space2bottom ? 'north' : 'south';

        if (restrict) {
            if (
                t.type === 'horizontal'
                && el !== t.el
                || (el.it
                    && el.it.level
                    && el.it.level === 2
                )
            ) dim.horDirection = null;
            if (el === t.el && t.type==='vertical') dim.horDirection = null;
            if (el === t.el && t.type==='horizontal') dim.verDirection = null;
        }

        return dim;
    }



    onclick(it) {
        var a = $(it.b.el).children('a');
        if (
            typeof a.attr('windowName') == 'string'
            && a.attr('windowName')!==''
        ) {
            window.open(a.attr('href'),a.attr('windowName')).focus();
        } else {
            var href = a.attr('href');
            if (href.match(/javascript:/)) eval(href.replace('javascript:','')); else window.location.href = href;
        }
    }


    updateItemStates() {
        var t = this;
        $(this.el).find('li > a').each(function(idx,li) {
            let
            isc = $(li).attr('vividMenu_isSelected_condition');

            if (isc) {
                var
                menuItem = t.items[idx].b.el,
                r = eval(isc);

                if (r)
                    $(menuItem).addClass('vividButtonSelected').removeClass('vividButton');
                else
                    $(menuItem).removeClass('vividButtonSelected').addClass('vividButton')
            }
        });
    }
}
