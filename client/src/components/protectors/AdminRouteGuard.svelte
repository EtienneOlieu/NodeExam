<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/user.js";
    export let navigate = useNavigate();
    export let location = useLocation();
   
    $: if (!$user) {
        navigate("/", {
            state: { from: $location.pathname },
            replace: true
        });
    } else if ($user.privilege !== "admin"){
        navigate("/noaccess", {
            state: { from: $location.pathname },
            replace: true
        });
    }
</script>

 <slot/>