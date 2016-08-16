<?php
define('ROOT_DIR', __DIR__);

require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/../custom/config.php';
require_once __DIR__.'/version.php';


define('HOST', isset($_SERVER["SERVER_NAME"]) ? $_SERVER["SERVER_NAME"] : 'default');

use Silex\Application;
use \Areanet\PIM\Classes\Config;
use Knp\Provider\ConsoleServiceProvider;

\Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/Config.php');
\Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/ManyToMany.php');
\Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/MatrixChooser.php');



Config\Adapter::setHostname(HOST);
date_default_timezone_set(Config\Adapter::getConfig()->APP_TIMEZONE);

$app = new Application();
$app->register(new Silex\Provider\ServiceControllerServiceProvider());

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'dbs.options' => array (
        'pim' => array(
            'driver'    => 'pdo_mysql',
            'host'      => Config\Adapter::getConfig()->DB_HOST,
            'dbname'    => Config\Adapter::getConfig()->DB_NAME,
            'user'      => Config\Adapter::getConfig()->DB_USER,
            'password'  => Config\Adapter::getConfig()->DB_PASS,
            'charset'   => Config\Adapter::getConfig()->DB_CHARSET,
        )
    ),
));

$app->register(new ConsoleServiceProvider(), array(
    'console.name'              => 'PIM',
    'console.version'           => APP_VERSION,
    'console.project_directory' => __DIR__
));

$app['entityResolver'] = $app->share(function ($app) {
    return new \Areanet\PIM\Classes\ORM\EntityResolver();
});



$app->register(new \Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider(), array(
    'orm.proxies_dir' => __DIR__.'/../data/cache/doctrine',
    'orm.em.options' => array(
        'connection' => 'pim',
        'mappings' => array(
            array(
                'type' => 'annotation',
                'namespace' => 'Areanet\PIM\Entity',
                'path' => __DIR__.'/areanet/PIM/Entity',
                'use_simple_annotation_reader' => false
            ),
            array(
                'type' => 'annotation',
                'namespace' => 'Custom\Entity',
                'path' => __DIR__.'/../custom/Entity',
                'use_simple_annotation_reader' => false
            ),
        )
    )
));


foreach(Config\Adapter::getConfig()->APP_SYSTEM_TYPES as $systemType){
    $typeClass = new $systemType($app);
    if($typeClass->getAnnotationFile()){
        \Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/'.$typeClass->getAnnotationFile().'.php');
    }
    \Areanet\PIM\Classes\TypeManager::registerType($typeClass);
}


if(!is_dir(__DIR__.'/../custom/Views/')){
    mkdir(__DIR__.'/../custom/Views/');
}

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' =>   array(__DIR__.'/../custom/Views/', __DIR__.'/public/ui/default/')
));

//Config Image-Processing

$app['thumbnailSettings'] = function ($app) {
    try {
        $queryBuilder = $app['orm.em']->createQueryBuilder();
        $queryBuilder
            ->select('thumbnailSetting')
            ->from('Areanet\PIM\Entity\ThumbnailSetting', 'thumbnailSetting')
            ->where("thumbnailSetting.isDeleted = false");
        $query = $queryBuilder->getQuery();
        return $query->getResult();
    }catch (\Doctrine\DBAL\Driver\PDOException $e){
        return array();
    }
};

foreach(Config\Adapter::getConfig()->FILE_PROCESSORS as $fileProcessorSetting){
    $fileProcessor = new $fileProcessorSetting();

    foreach($app['thumbnailSettings'] as $thumbnailSetting){
        $fileProcessor->registerImageSize($thumbnailSetting);
    }

    Areanet\PIM\Classes\File\Processing::registerProcessor($fileProcessor);
}

$app['debug'] = Config\Adapter::getConfig()->APP_DEBUG;

$app['consoleManager'] = $app->share(function ($app) {
    return new \Areanet\PIM\Classes\Manager\ConsoleManager($app);
});

$app['uiManager'] = $app->share(function ($app) {
    return new \Areanet\PIM\Classes\Manager\UIManager($app);
});



//Config Spatial ORM-Types
Doctrine\DBAL\Types\Type::addType('point', '\Areanet\PIM\Classes\ORM\Spatial\PointType');
$em= $app['orm.em']->getConnection()->getDatabasePlatform();
$em->registerDoctrineTypeMapping('point', 'point');

$config = new Doctrine\ORM\Configuration();
$config->addCustomNumericFunction('DISTANCE', '\Areanet\PIM\Classes\ORM\Spatial\PointType\Distance');
$config->addCustomNumericFunction('POINT_STR', '\Areanet\PIM\Classes\ORM\Spatial\PointType\PointStr');

require_once __DIR__.'/../custom/app.php';