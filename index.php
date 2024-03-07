<?php
session_start();
if($_SESSION['web-ide'] == "authenticated"){ ?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic'>
    <link rel="stylesheet" href="./style.css">

</head>

<body>
    <!-- partial:index.partial.html -->
    <div class="window">
        <ul class="result">
            <li class="ready">Shell</li>
        </ul>

        <div class="command-area">
            <label for="command-input">$</label>
            <input type="text" id="command-input" class="command" placeholder="type command here…" />
        </div>
    </div>
    <!-- partial -->
    <script src="./script.js"></script>

</body>

</html>
<? }else{
    var_dump($_SESSION);
    echo "please login to continue";
}

?>