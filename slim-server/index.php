<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Middlewares\TrailingSlash;

require __DIR__ . '/vendor/autoload.php';

$mc = new MongoDB\Client("mongodb://localhost:27017/flashcards-react-jerry");
$collection = $mc->selectCollection('flashcards-react-jerry', 'cards');

$app = AppFactory::create();
$app->add(new TrailingSlash(false)); // remove trailing slashes

// GET /
$app->get('/', function (Request $request, Response $response, array $args) {
    // TODO serve the html for the react app instead of "Hello world!"
    $response->getBody()->write(file_get_contents('../client/build/index.html'));
    return $response;
});

// GET /cards
$app->get('/cards', function (Request $request, Response $response, array $args) use ($collection) {
    $result = $collection->find()->toArray();

    foreach ($result as $card) {
        $card['_id'] = (string) $card['_id'];
    }
    $response->getBody()->write(json_encode($result));

    return $response->withHeader('Content-Type', 'application/json');
});

// GET /cards/{id}
$app->get('/cards/{id}', function (Request $request, Response $response, array $args) use ($collection) {
    $card = $collection->findOne(['_id' => new MongoDB\BSON\ObjectID($args['id'])]);
    $card['_id'] = (string) $card['_id'];
    $response->getBody()->write(json_encode($card));

    return $response->withHeader('Content-Type', 'application/json');
});

// POST /cards
$app->post('/cards', function (Request $request, Response $response, array $args) use ($collection) {
    $body = json_decode($request->getBody(), true);
    $result = $collection->insertOne($body);
    $id = $result->getInsertedId();

    $card = $collection->findOne(['_id' => $id]);
    $card['_id'] = (string) $card['_id'];
    $response->getBody()->write(json_encode($card));

    return $response->withHeader('Content-Type', 'application/json');
});

// Second try
/*
$app->post('/', function (Request $request, Response $response, array $args) use ($collection) {
    $result = $collection->$request->getParsedBody();

    $result['_id'] = $this->mc->lastInsertId();
    return $this->response->withJson($result);
});
*/

// PATCH /cards/{id}
$app->patch('/cards/{id}', function (Request $request, Response $response, array $args) use ($collection) {
    $body = json_decode($request->getBody(), true);
    $collection->updateOne(
        ['_id' => new MongoDB\BSON\ObjectID($args['id'])],
        ['$set' => $body]
    );
    $card = $collection->findOne(['_id' => new MongoDB\BSON\ObjectID($args['id'])]);
    $card['_id'] = (string) $card['_id'];
    $response->getBody()->write(json_encode($card));

    return $response->withHeader('Content-Type', 'application/json');
});

// DELETE /cards/all
$app->delete('/cards/all', function (Request $request, Response $response, array $args) use ($collection) {
    $collection->deleteMany([]);

    return $response;
});

/* MongoDB delete method:
function deleteMany($filter, array $options = []): MongoDB\DeleteResult

$deleteResult = $collection->deleteMany(['']);
*/

// DELETE /cards/{id}
$app->delete('/cards/{id}', function (Request $request, Response $response, array $args) use ($collection) {
    $collection->deleteOne(['_id' => new MongoDB\BSON\ObjectID($args['id'])]);

    return $response;
});

$app->addErrorMiddleware(true, false, false);
$app->run();
