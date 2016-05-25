<?php
require_once __DIR__.'/vendor/autoload.php';
require_once __DIR__.'/custom/config.php';
require_once __DIR__.'/version.php';

define('ROOT_DIR', __DIR__);

define('HOST', isset($_SERVER["SERVER_NAME"]) ? $_SERVER["SERVER_NAME"] : 'cli');

use Silex\Application;
use \Areanet\PIM\Classes\Config;

use Knp\Provider\ConsoleServiceProvider;


\Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/Config.php');
\Doctrine\Common\Annotations\AnnotationRegistry::registerFile(__DIR__.'/areanet/PIM/Classes/Annotations/ManyToMany.php');

Config\Adapter::setHostname(HOST);
date_default_timezone_set(Config\Adapter::getConfig()->APP_TIMEZONE);

$app = new Application();
$app->register(new Silex\Provider\ServiceControllerServiceProvider());

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array (
        'driver'    => 'pdo_mysql',
        'host'      => Config\Adapter::getConfig()->DB_HOST,
        'dbname'    => Config\Adapter::getConfig()->DB_NAME,
        'user'      => Config\Adapter::getConfig()->DB_USER,
        'password'  => Config\Adapter::getConfig()->DB_PASS,
        'charset'   => Config\Adapter::getConfig()->DB_CHARSET,
    ),
));

$app->register(new ConsoleServiceProvider(), array(
    'console.name'              => 'MyApplication',
    'console.version'           => '1.0.0',
    'console.project_directory' => __DIR__
));


$app->register(new \Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider(), array(
    'orm.proxies_dir' => __DIR__.'/data/cache/doctrine',
    'orm.em.options' => array(
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
                'path' => __DIR__.'/custom/Entity',
                'use_simple_annotation_reader' => false
            ),
        ),
    ),
));

$user = new \Areanet\PIM\Entity\User();
$user->getAlias();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__.'/custom/Views/',
));


$app['debug'] = Config\Adapter::getConfig()->APP_DEBUG;


//Config Image-Processing
//@todo: Implement Database version: #11
Areanet\PIM\Classes\File\Processing::registerProcessor('image/jpeg', '\Areanet\Pim\Classes\File\Processing\Image');
Areanet\PIM\Classes\File\Processing::registerProcessor('image/gif', '\Areanet\Pim\Classes\File\Processing\Image');
Areanet\PIM\Classes\File\Processing::registerProcessor('image/png', '\Areanet\Pim\Classes\File\Processing\Image');

Areanet\PIM\Classes\File\Processing\Image::registerImageSize(320);
Areanet\PIM\Classes\File\Processing\Image::registerImageSize(640);
Areanet\PIM\Classes\File\Processing\Image::registerImageSize(960);

//Config Spatial ORM-Types
Doctrine\DBAL\Types\Type::addType('point', '\Areanet\PIM\Classes\ORM\Spatial\PointType');
$em= $app['orm.em']->getConnection()->getDatabasePlatform();
$em->registerDoctrineTypeMapping('point', 'point');

$config = new Doctrine\ORM\Configuration();
$config->addCustomNumericFunction('DISTANCE', '\Areanet\PIM\Classes\ORM\Spatial\PointType\Distance');
$config->addCustomNumericFunction('POINT_STR', '\Areanet\PIM\Classes\ORM\Spatial\PointType\PointStr');

require_once __DIR__.'/custom/app.php';