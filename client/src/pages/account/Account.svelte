<script>
import { user } from "../../store/user.js";

</script>

<h1>Account Info</h1>
<h2>{$user.name}</h2>


<p>Your registerede email is: {$user.email}</p>
<p>Your rights are: "{$user.privilege}"</p>

