<?php

$app['consoleManager']->addCommand(new \Custom\Command\DatabaseImport());
$app['consoleManager']->addCommand(new \Custom\Command\FileImport());
$app['consoleManager']->addCommand(new \Custom\Command\SizeImport());

$app['uiManager']->addBlock('INDEX_NAVIGATION_ADMIN_SUB_APPEND', 'blocks/deploy.html');
$app['uiManager']->addBlock('LIST_TABLE_BODY_BUTTONS_PREPEND', 'blocks/list-button.html');
$app['uiManager']->addBlock('LIST_TABLE_BODY_COL_APPEND', 'blocks/col-append.html');

$app['uiManager']->addRoute('/custom/deploy', 'deploy.html', 'DeployCtrl');
$app['uiManager']->addJSFile('controllers/list-button.controller.js');

$app['uiManager']->addCSSFile('custom.css');

$app['dispatcher']->addListener('pim.controller.after.api.schemaaction', function (\Areanet\PIM\Classes\Event $event) {
    $response   = $event->getParam('response');
    $content    = json_decode($response->getContent());
    $content->message = "mySchemaAction";
    $response->setContent(json_encode($content));
});

$app['dispatcher']->addListener('pim.entity.after.insert', function (\Areanet\PIM\Classes\Event $event) {

});

$app->get('/', function () use ($app) {

    return $app['twig']->render('index.twig', array(
        'foo' => 'bar'
    ));
});

