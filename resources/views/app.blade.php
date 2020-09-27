<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <meta name="csrf-token" content="{{ csrf_token() }} ">

    <title>React Laravel</title>
    <link href="{{ asset('AdminLTE-3.0.5/plugins/fontawesome-free/css/all.min.css')}}" rel="stylesheet" />
    <link href="{{ asset('css/app.css') }}" rel="stylesheet"/>
    <link href="{{ asset('AdminLTE-3.0.5/dist/css/adminlte.min.css')}}" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
<body class="hold-transition sidebar-mini layout-navbar-fixed">
    <div class="wrapper">

        <div id="app"></div>
        <script src="{{ asset('js/app.js') }}"></script>
        <script src="{{ asset('AdminLTE-3.0.5/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js')}}"></script>
        <script src="{{ asset('AdminLTE-3.0.5/dist/js/adminlte.min.js')}}"></script>
    </div>
</body>
</html>